import {IStreamType} from "./IStreamType";
import {AStreamType} from "./AStreamType";


export class StreamDint extends AStreamType implements IStreamType{
  typeName = "DINT"
  countPer32 = 1;

  constructor(bitSize: number) {
    super(bitSize);
    this.getArray();
  }
}
