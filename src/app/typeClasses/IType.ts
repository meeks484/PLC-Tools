

export interface IType{
  thirtyTwo: number[];
  typeValues: any[];
  rowHeaders: string[];
  characterCount: number;
  show: boolean[];
  insertValue(value: any, index: number): void
}
