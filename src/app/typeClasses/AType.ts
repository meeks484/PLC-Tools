


export abstract class AType {
  abstract typeName: string;
  abstract countPer32: number;
  abstract rowHeaders: string[];
  abstract typeValues: any[];

  bits32: number = 32;
  thirtyTwo: number[] = Array(this.bits32);
  maxInputTables: number = 4;
  show: boolean[] = Array(this.maxInputTables);

  protected constructor(bit32Input?: number[]) {
    if (bit32Input !== undefined) {
      this.thirtyTwo = bit32Input;
    } else {
      this.thirtyTwo.fill(0)
    }

  }

  protected abstract insertValue(value: any, index: number): void;

  protected abstract inputValidate(value: any): any;

  protected getShow(showCount: number){
    for (let i = 0; i < this.maxInputTables; ++i){
      i < showCount? this.show[i] = true : this.show[i] = false;
    }
  }

  protected buildRowHeader(): void{
    this.rowHeaders = Array(this.countPer32);
    for (let i = 0 ; i < this.countPer32 ; ++i){
      // this.rowHeaders[i] = this.typeName + "[" + i.toString() + "]";
      this.rowHeaders[i] = "[" + i.toString() + "]";
    }
  }


  protected abstract getTypeValues(): void;

  protected abstract getThirtyTwo(): void;

}
