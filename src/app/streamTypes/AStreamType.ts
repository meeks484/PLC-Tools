
export abstract class AStreamType {
  abstract typeName: string;
  abstract countPer32: number;

  arrayStream: string[] = Array(0);
  rowSpan: number[];
  bit32: number = 32;

  protected constructor(private bitSize: number) {

  }

  protected getArray(){

    let size: number = (this.bitSize / this.bit32) * this.countPer32;
    let arrayStream = Array(size);
    this.rowSpan = Array(size)
      .fill(((this.bit32 / this.countPer32) / this.bitSize) * 100);

    for (let i = 0; i < arrayStream.length; ++i){
      arrayStream[i] = this.typeName + "[" + i.toString() + "]";
    }
    this.arrayStream = arrayStream;
  }
}
