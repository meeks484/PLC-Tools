

export interface IType{
  typeName: string;
  thirtyTwo: number[];
  typeValues: any[];
  rowHeaders: string[];
  characterCount: number;
  show: boolean[];
  maxValue: number;
  minValue: number;
  insertValue(value: any, index: number): void
}
