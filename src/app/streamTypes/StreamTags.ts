import {IStreamType} from "./IStreamType";
import * as stream from "stream";


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
    let bitSize: number = 0;
    let streamIndex: number = 0; //Index for the stream array

    for (let udtIndex = 0 ; udtIndex < this.tagArray.length ; ++udtIndex){
      let typeName: string = this.tagArray[udtIndex][1] //Type name as it appears in the .CSV file.
      let isTagArray: boolean = this.isTagArray(typeName);
      let dataType: string = this.getDataType(typeName,isTagArray)//Type name after removing array symbol
      let dataSize: number = this.tagSize(dataType) // size in bits for this dataType

      if (dataSize == 0)
        continue;

      let tagArraySize: number = this.getTagArraySize(typeName,isTagArray);

      //if a tag is an array, then loop and generate a name (with index number)
      //  Push the name and its rowSpan into the local arrays.
      //  Add the current bit size to the overall bit size.
      for (let tagIndex = 0; tagIndex < tagArraySize ; ++tagIndex){
        let rowTagName: string = this.getRowTagName(this.tagArray[udtIndex][0],isTagArray,tagIndex)
        arrayStream.push(rowTagName)
        rowSpan.push(dataSize)//This is in units of rowCounts
        bitSize += dataSize;
        ++streamIndex;
      }
    }

    //User Defined Types (UDT) always round up to a size that's divisible by 32 bits (4 BYTE blocks).
    //  Check if the size of this UDT is divisible by 32, if not, add to its size so
    //  it is. And label that extra memory as "Not Defined".
    if (bitSize % this.bit32 !=0){
      arrayStream.push("Not Defined");
      let remainingFor32: number = this.bit32 - (bitSize % this.bit32);
      rowSpan.push(remainingFor32)
      bitSize += remainingFor32;
    }


    this.arrayStream = arrayStream;


    this.bitSize = bitSize;
    this.rowSpan = rowSpan.map(x => (x / this.bitSize) * 100);//This is in units of table height percentage
  }







  //Get the size (in bits) for the data type on this row.
  // A return of a size 0 means an invalid type or syntax was entered on the row.
  tagSize(dataType: string): number{
    const BIT_SIZE = 1;
    const BYTE_SIZE = 8;

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
        return this.getNonPrimarySize(dataType,BYTE_SIZE)
    }
  }





  //Get the size (in bits) of the two non-Primary types:
  //  * String
  //  * custom type
  //  A return of 0 means an invalid type or syntax was used
  getNonPrimarySize(dataType: string, BYTE_SIZE: number): number{
    const STRING: string = "STRING";
    const CUSTOM: string = "customT"

    if (dataType.slice(0,STRING.length) == STRING)
      return this.typeIsString(STRING, dataType,BYTE_SIZE)
    else if (dataType.slice(0,CUSTOM.length) == CUSTOM)
      return this.typeIsCustom(CUSTOM,dataType,BYTE_SIZE)
    else
      return 0; //Invalid type on this row of the .CSV file
  }





  //Returns the size in bits for STRING data types
  //string types are composed of a single dint (which stores the length of the string)
  //  and a single SINT for each character allocation. (SINT = 1 BYTE)
  //  A string without a size designation (eg: STRING) automatically as 82 charactors allocated to its memory.
  typeIsString(STRING: string, dataType: string, BYTE_SIZE: number): number{
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
  typeIsCustom(CUSTOM: string, dataType: string, BYTE_SIZE: number): number{
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
