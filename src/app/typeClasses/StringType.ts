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
    super("A", bit32Input)
    this.buildRowHeader()
    this.getTypeValues()
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
      this.typeValues[i] = String.fromCharCode(converted)
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

}
