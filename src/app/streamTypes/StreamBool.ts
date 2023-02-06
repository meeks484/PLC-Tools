import {IStreamType} from "./IStreamType";
import {AStreamType} from "./AStreamType";


export class StreamBool extends AStreamType implements IStreamType{
  typeName = "BOOL"
  countPer32 = 32;

  constructor(bitSize: number) {
    super(bitSize);
    this.getArray();
  }
}
