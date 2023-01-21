import {Binary} from "../Binary";
import {AType} from "./AType";


export abstract class AUnsignedType extends AType{
  abstract bitCount: number;
  abstract characterCount: number;

  constructor(bitThirtyTwo?: number[]) {
    super(0, bitThirtyTwo);
  }

  protected getTypeValues(): void{
    this.typeValues = Array(this.countPer32)
    let bits: number[][] = Binary.getBitsFrom32(this.thirtyTwo,this.countPer32,this.bitCount)

    for (let i = 0; i < this.countPer32; ++i){
      this.typeValues[i] = Binary.binaryToDecimal(bits[i])
    }
  }

  protected getThirtyTwo(): void{
    let bits: number[][] = Array(this.countPer32)
    for (let i = 0; i < this.countPer32; ++i){
      bits[i] = Binary.integerToBinary(this.typeValues[i],this.bitCount)
    }
    this.thirtyTwo = Binary.bytesTo32Bits(bits,this.countPer32)
  }

  insertValue(value: number, index: number) {
    value = this.inputValidate(value)
    this.typeValues[index] = value;
    this.getThirtyTwo()
  }

  protected inputValidate(value: number): number {
    if (Number.isNaN(+value))
      return 0

    let max: number = (2 ** this.bitCount) - 1;
    let min: number = 0;
    if (value > max)
      return max;
    else if (value < min)
      return min;
    else
      return value;
  }
}
