import {IType} from "./IType";
import {ASignedType} from "./ASignedType";

export class DintType extends ASignedType implements IType{
  typeName = "DINT"
  countPer32 = 1;
  bitCount = 32;
  characterCount = 10;
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
