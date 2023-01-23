import {IType} from "./IType";
import {AUnsignedType} from "./AUnsignedType";



export class UsintType extends AUnsignedType implements IType {
  typeName = "USINT"
  countPer32 = 4;
  bitCount = 8;
  characterCount = 3
  typeValues = Array(this.countPer32);
  rowHeaders = Array(this.countPer32);
  maxValue = this.maxFunction()
  minValue = this.minFunction()

  constructor (bit32Input?: number[]){
    super(bit32Input);
    this.buildRowHeader()
    this.getTypeValues()
    this.getShow(1);
  }

}
