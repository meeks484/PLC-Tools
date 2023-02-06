import {IType} from "./IType";
import {AType} from "./AType";
import {Binary} from "../Binary";



export class FloatType extends AType implements IType{
  typeName = "REAL";
  characterCount = 8;
  bitCount = 32;
  countPer32 = 1;
  typeValues = Array(this.countPer32)
  rowHeaders: string[] = Array();
  maxValue: number = 3.4e38;
  minValue: number= -1.16e-38;


  constructor(bit32Input?: number[]) {
    super(bit32Input);
    this.buildRowHeader()
    this.getTypeValues()
    this.getShow(1);

  }






  insertValue(value: number, index: number) {
    value = this.inputValidate(value);
    this.typeValues[0] = value;
    this.getThirtyTwo()
  }



  protected inputValidate(value: any): number {
    if (Number.isNaN(+value))
      return 0
    else if (+value < this.minValue)
      return this.minValue
    else if (+value > this.maxValue)
      return this.maxValue;
    else
      return +value;
  }


  protected getTypeValues() {
    const MANT_START: number = 0;
    const MANT_END: number = 22;
    const EXP_START: number = 23;
    const EXP_END: number = 30
    const SIGN_START: number =31

    let sign: number = this.thirtyTwo[SIGN_START] == 1? -1 : 1;

    let exponent = 0;
    let base = 2;
    for (let i = 0; i <= EXP_END - EXP_START; i++){
      if (this.thirtyTwo[EXP_START + i] == 1)
        exponent += Math.pow(base, i);
    }

    exponent -= 127;

    let mantissa = 1;
    for (let i = 1; i <= MANT_END - MANT_START + 1; i++){
      if (this.thirtyTwo[MANT_END - (i - 1)] == 1)
        mantissa += Math.pow(base, -i);
    }
    let result: number = sign * mantissa * Math.pow(base,exponent);
    this.typeValues[0] = result.toExponential(3)

  }


  protected override buildRowHeader() {
    this.rowHeaders.push("[0]")
  }

  protected getThirtyTwo(): void{

    let float: number = this.typeValues[0];
    if (float == 0){
      this.thirtyTwo.fill(0);
      return;
    }

    let sign: string = float < 0 ? "1" : "0"
    float = Math.abs(float)

    let exponent: number = 0;
    while (float >= 2){
      float /= 2;
      exponent++;
    }

    while (float < 1){
      float *= 2;
      exponent--;
    }

    exponent += 127;
    let exponentBinary = exponent.toString(2).padStart(8,'0')

    let mantissa: number = float - 1;
    let mantissaBinary = '';
    for (let i = 0; i < 23; i++){
      mantissa *= 2;
      if (mantissa >= 1){
        mantissaBinary += '1'
        mantissa -= 1;
      }
      else{
        mantissaBinary += '0';
      }
    }

    let binaryString: string = sign + exponentBinary + mantissaBinary;

    let result: number[] = Array(32);
    for (let i = 0; i < binaryString.length; ++i){
      result[31-i] = +binaryString[i];
    }
    this.thirtyTwo = result;
  }
}
