import {IType} from "./IType";
import {AType} from "./AType";
import {Binary} from "../Binary";

export class StringType extends AType implements IType{
  typeName = "STRING"
  countPer32 = 4;
  bitCount = 8;
  characterCount = 3
  typeValues = Array(this.countPer32);
  rowHeaders = Array(this.countPer32);
  maxValue: number = 0;
  minValue: number = 0;


  constructor(bit32Input?: number[]) {
    super(bit32Input)
    this.buildRowHeader()
    if (bit32Input !== undefined) {
      this.getTypeValues()
    } else {
      this.typeValues.fill("A")
      this.getThirtyTwo()
    }
    this.getShow(1);
  }

  insertValue(value: string, index: number) {
    value = this.inputValidate(value)
    this.typeValues[index] = value;
    this.getThirtyTwo()
  }

  protected inputValidate(value: string): string {
    if (value.length>1)
      return value.slice(0,1)
    else
      return value
  }

  getTypeValues(){
    let bits: number[][]
    bits = Binary.getBitsFrom32(this.thirtyTwo,this.countPer32,this.bitCount)

    for (let i = 0; i < this.countPer32; ++i){
      let converted: number = Binary.binaryToDecimal(bits[i]);
      if (converted > 32 && converted != 127)
        this.typeValues[i] = String.fromCharCode(converted)
      else
        this.typeValues[i] = this.otherCharacters(converted);
    }
  }

  getThirtyTwo(){
    let bits: number[][] = Array(this.countPer32)
    for (let i = 0; i < this.countPer32; ++i){
      let converted: number = this.typeValues[i].charCodeAt(0)
      bits[i] = Binary.integerToBinary(converted,this.bitCount)
    }
    this.thirtyTwo = Binary.bytesTo32Bits(bits,this.countPer32)
  }

  otherCharacters(decimal: number): string{
    switch (decimal){
      case 1:
        return "SOH"; break
      case 2:
        return "STX"; break
      case 3:
        return "ETX"; break
      case 4:
        return "EOT"; break
      case 5:
        return "ENQ"; break
      case 6:
        return "ACK"; break
      case 7:
        return "BEL"; break
      case 8:
        return "BS"; break
      case 9:
        return "TAB"; break
      case 10:
        return "LF"; break
      case 11:
        return "VT"; break
      case 12:
        return "FF"; break
      case 13:
        return "CR"; break
      case 14:
        return "SO"; break
      case 15:
        return "SI"; break
      case 16:
        return "DLE"; break
      case 17:
        return "DC1"; break
      case 18:
        return "DC2"; break
      case 19:
        return "DC3"; break
      case 20:
        return "DC4"; break
      case 21:
        return "NAK"; break
      case 22:
        return "SYN"; break
      case 23:
        return "ETB"; break
      case 24:
        return "CAN"; break
      case 25:
        return "EM"; break
      case 26:
        return "SUB"; break
      case 27:
        return "ESC"; break
      case 28:
        return "FS"; break
      case 29:
        return "GS"; break
      case 30:
        return "RS"; break
      case 31:
        return "US"; break
      case 32:
        return "Space"; break
      case 127:
        return "DEL"
      default:
        return "NUL"
    }
  }
}
