import {IType} from "./IType";
import {AUnsignedType} from "./AUnsignedType";



export class UintType extends AUnsignedType implements IType {
  typeName = "UINT"
  countPer32 = 2;
  bitCount = 16;
  characterCount = 6
  typeValues = Array(this.countPer32);
  rowHeaders = Array(this.countPer32);

  constructor (bit32Input?: number[]){
    super(bit32Input);
    this.buildRowHeader()
    this.getTypeValues()
    this.getShow(1);
  }

}
