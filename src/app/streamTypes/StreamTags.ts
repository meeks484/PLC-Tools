import {IStreamType} from "./IStreamType";
import * as stream from "stream";

const BIT_SIZE: number = 1;
const BYTE_SIZE: number = 8;
const STRING: string = "STRING";
const CUSTOM: string = "customT"

export class StreamTags implements IStreamType{
  bit32: number = 32;
  arrayStream: string[];
  bitSize: number;
  rowSpan: number[];

  constructor(private tagArray: string[]) {
    this.convertToStream();
  }





  //Goes through each row of the .CSV file, and returns the following:
  // * The overall size (in bits) of the entire custom data type
  // * The array stream, which is the array that contains that tag names
  //    (and array index if necessary) that fill up the tag column on the screen.
  // * The span array, which is used to determine how many rows to combine for each
  //    Element in the array stream.
  convertToStream(){
    let arrayStream: string[] = Array()
    let rowSpan: number[] = Array();
    let streamIndex: number = 0; //Index for the stream array

    //Keep track of overall size of the UDT by using bitSize.
    //Keep track of where we are at in the current 32 bit block with current32.
    //An object for these sizes are used to facilitate passing by reference.
    let sizes = {bitSize: 0, current32: 0}

    for (let udtIndex = 0 ; udtIndex < this.tagArray.length ; ++udtIndex){
      let typeName: string = this.tagArray[udtIndex][1] //Type name as it appears in the .CSV file.
      let isTagArray: boolean = this.isTagArray(typeName);
      let dataType: string = this.getDataType(typeName,isTagArray)//Type name after removing array symbol
      let dataSize: number = this.tagSize(dataType) // size in bits for this dataType

      //Error condition. Means an invalid data type was on the .CSV file. This row is skipped.
      if (dataSize == 0)
        continue;

      let tagArraySize: number = this.getTagArraySize(typeName,isTagArray);

      //if a tag is an array, then loop and generate a name (with index number)
      //  Push the name and its rowSpan into the local arrays.
      //  Add the current bit size to the overall bit size.
      for (let tagIndex = 0; tagIndex < tagArraySize ; ++tagIndex){
        this.pushUnused(arrayStream, rowSpan, sizes,dataSize); //Add in row for unused memory if needed.

        if (sizes.current32>=32)
          sizes.current32 = 0;

        let rowTagName: string = this.getRowTagName(this.tagArray[udtIndex][0],isTagArray,tagIndex)
        arrayStream.push(rowTagName)
        rowSpan.push(dataSize)//This is in units of rowCounts
        sizes.bitSize += dataSize;
        sizes.current32 += dataSize;
        ++streamIndex;
      }
    }

    //User Defined Types (UDT) always round up to a size that's divisible by 32 bits (4 BYTE blocks).
    //  Check if the size of this UDT is divisible by 32, if not, add to its size so
    //  it is. And label that extra memory as "Not Used".
    if (sizes.bitSize % this.bit32 !=0){
      arrayStream.push("Not Used");
      let remainingFor32: number = this.bit32 - (sizes.bitSize % this.bit32);
      rowSpan.push(remainingFor32)
      sizes.bitSize += remainingFor32;
    }

    this.arrayStream = arrayStream;
    this.bitSize = sizes.bitSize;
    this.rowSpan = rowSpan.map(x => (x / this.bitSize) * 100);//This is in units of table height percentage
  }







  //User Defined Datatypes allocates its memory in blocks of 32 bits.
  //  Further more, if the datatype size is less than 32 bits, it is allocated in
  //    a block that matches its size.
  //  A value must begin its memory allocation on a bit number which is divisible
  //  by its size:
  //    8 bits (SINT and USINT) have to start on the 1st, 8th, 16nth, or 24th bits.
  //    16 bits (INT or UINT) have to start on the 1st or 16nth bit.
  //    32 bits and greater must start on the 1st bit.
  //  So, as the stream receives a new data type, if the current bit  does not
  //    match the above criteria, then it allocates unused memory until it reaches a bit
  //    that matches the above criteria.
  pushUnused(
    arrayStream: string[],
    rowSpan: number[],
    sizes: {bitSize: number, current32: number}, //these values needed to be passed by reference.
    dataSize: number){

    if (sizes.current32 >= 32)//Memory is stored in 32 bit blocks. Reset each time we hit 32.
      sizes.current32 = 0;

    //Check if the current32 divisible by the data size. If its not, then allocate unused memory.
    //For datasizes greater than 32 (Strings or custom UDTs), we need to begin at the 1st bit. So
    //treat those like a 32 bit type for unused memory purposes.
    // The remainder represents the number of bits already used in the current block.
    //If remainder equals 0, then we meet the criteria to not need to add unused memory.
    let remainder: number = (sizes.current32) % dataSize;
    if (remainder != 0) {
      if (dataSize > 32)
        dataSize = 32;

      let unusedSize: number = dataSize - remainder;

      arrayStream.push("Not Used");
      rowSpan.push(unusedSize);
      sizes.bitSize += unusedSize;
      sizes.current32 += unusedSize;
    }
  }








  //Get the size (in bits) for the data type on this row.
  // A return of a size 0 means an invalid type or syntax was entered on the row.
  tagSize(dataType: string): number{
    switch (dataType){
      case "BOOL":
        return BIT_SIZE; break;
      case "SINT":
      case "USINT":
        return BYTE_SIZE; break;
      case "INT":
      case "UINT":
        return 2 * BYTE_SIZE; break;
      case "DINT":
      case "UDINT":
      case "REAL":
        return 4 * BYTE_SIZE; break;
      default:
        return this.getNonPrimarySize(dataType)
    }
  }






  //Get the size (in bits) of the two non-Primary types:
  //  * String
  //  * custom type
  //  A return of 0 means an invalid type or syntax was used
  getNonPrimarySize(dataType: string): number{
    if (dataType.slice(0,STRING.length) == STRING)
      return this.typeIsString(dataType)
    else if (dataType.slice(0,CUSTOM.length) == CUSTOM)
      return this.typeIsCustom(dataType)
    else
      return 0; //Invalid type on this row of the .CSV file
  }





  //Returns the size in bits for STRING data types
  //string types are composed of a single dint (which stores the length of the string)
  //  and a single SINT for each character allocation. (SINT = 1 BYTE)
  //  A string without a size designation (eg: STRING) automatically as 82 charactors allocated to its memory.
  typeIsString(dataType: string): number{
    const DINT: number = 4; //Size of a DINT in bytes
    const STRING_SIZE: number = 82//Bytes of a string who's length is not defined.
    if (dataType.length == STRING.length)
      return (STRING_SIZE + DINT) * BYTE_SIZE; //String data types includes a DINT type
    else{
      let stringCount: number = this.customCount(STRING.length,dataType);
      if (stringCount == 0)
        return 0;
      return (stringCount + DINT) * BYTE_SIZE
    }
  }





  //Returns the size in bits for custom data types
  typeIsCustom(dataType: string): number{
    let count: number = this.customCount(CUSTOM.length, dataType)
    return count * BYTE_SIZE;
  }





  //Strings and custom types can have a number at the end of the type:
  //  * eg: STRING10
  //  * eg: customT12
  //That number means different things, depending on the type. This method returns that number
  //The value of 0 is returned if no number is there, or an invalid character (non-number) is there.
  customCount(nameLength: number, dataType: string): number{
    if (nameLength == dataType.length)
      return 0;
    else{
      let count: number = +dataType.slice(nameLength, dataType.length)
      if (Number.isNaN(count))
        return 0;
      else
        return count;
    }
  }






  isTagArray(tagName: string): boolean{
    if (tagName.includes("]"))
      return true;
    else
      return false;
  }




  //Isolates the data type from the array designator.
  getDataType(tagName: string, isTagArray: boolean): string{
    if (isTagArray)
      return tagName.slice(0,tagName.indexOf("["));
    else
      return tagName;
  }




  //Adds the array brackets to the tag name if necessary.
  getRowTagName(tagName: string, isTagArray: boolean,tagIndex: number){
    if (isTagArray)
      return tagName + "[" + tagIndex + "]";
    else
      return tagName
  }





  getTagArraySize(tag: string, isTagArray: boolean): number{
    let firstDigitIndex: number = tag.indexOf("[") + 1;
    if (isTagArray)
      return Number(tag.slice(firstDigitIndex,tag.indexOf("]")))
    else
      return 1
  }
}
