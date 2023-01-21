import {IType} from "./IType";
import {AUnsignedType} from "./AUnsignedType";



export class UdintType extends AUnsignedType implements IType {
  typeName = "UDINT"
  countPer32 = 1;
  bitCount = 32;
  characterCount = 10
  typeValues = Array(this.countPer32);
  rowHeaders = Array(this.countPer32);

  constructor (bit32Input?: number[]){
    super(bit32Input);
    this.buildRowHeader()
    this.getTypeValues()
    this.getShow(1);
  }

}
