import {IType} from "./IType";
import {AType} from "./AType";



export class BoolType extends AType implements IType{
  typeName = "BOOL";
  characterCount = 3;
  bitCount = 1;
  countPer32 = 32;
  typeValues = Array(this.countPer32)
  rowHeaders = Array(this.countPer32)
  maxValue: number = 1;
  minValue: number = 0;

  constructor(bit32Input?: number[]) {
    super(0,bit32Input);
    this.buildRowHeader()
    this.getTypeValues()
    this.getShow(4);
  }

  insertValue(value: number, index: number) {
    value = this.inputValidate(value)
    this.typeValues[index] = value;
    this.getThirtyTwo()
  }

  protected inputValidate(value: number): number {
    if (Number.isNaN(+value))
      return 0

    let max: number = 1;
    let min: number = 0;
    if (value > max)
      return max;
    else if (value < min)
      return min;
    else
      return value;
  }

  protected getTypeValues() {
    this.typeValues = this.thirtyTwo;
  }

  protected getThirtyTwo() {
    this.thirtyTwo = this.typeValues;
  }
}

