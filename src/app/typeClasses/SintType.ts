import {IType} from "./IType";
import {ASignedType} from "./ASignedType";

export class SintType extends ASignedType implements IType{
  typeName = "SINT"
  countPer32 = 4;
  bitCount = 8;
  characterCount = 3
  typeValues = Array(this.countPer32);
  rowHeaders = Array(this.countPer32);

  constructor (bit32Input?: number[]){
    super(bit32Input);
    this.buildRowHeader()
    this.getTypeValues()
    this.getShow(1);
  }

}
