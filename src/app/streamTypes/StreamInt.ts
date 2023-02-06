import {IStreamType} from "./IStreamType";
import {AStreamType} from "./AStreamType";


export class StreamInt extends AStreamType implements IStreamType{
  typeName = "INT"
  countPer32 = 2;

  constructor(bitSize: number) {
    super(bitSize);
    this.getArray();
  }
}
