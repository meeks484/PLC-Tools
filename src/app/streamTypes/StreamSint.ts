import {IStreamType} from "./IStreamType";
import {AStreamType} from "./AStreamType";


export class StreamSint extends AStreamType implements IStreamType{
  typeName = "SINT"
  countPer32 = 4;

  constructor(bitSize: number) {
    super(bitSize);
    this.getArray();
  }
}
