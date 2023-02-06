import {Binary} from "../Binary";

export class Rs232Type {
  private dataSize: number = 8; //8 bit binary number
  private idleBits: number = 2; //number of idle bits
  private wordSize: number = this.dataSize + this.idleBits + 2; //The 2 represents the start and stop bits.
  decimal: number;
  hex: string;
  binary: number[];
  word: number[] = Array(this.wordSize).fill(1);
  volt: number = 5;
  voltStream: number[] = Array(this.word.length).fill(-this.volt);

  constructor(public ascii: string) {
    this.decimal = ascii.charCodeAt(0);
    this.hex = this.decimal.toString(16);
    this.binary = Binary.integerToBinary(this.decimal,this.dataSize)

    //switch the start bit values
    this.word[this.idleBits] = 0; //Start bit
    this.voltStream[this.idleBits] = this.volt;

    let dataStart: number = this.idleBits + 1
    for (let i = 0; i < this.binary.length; ++i){
      if (this.binary[i] = 1) {
        this.word[i + dataStart] = 0;
        this.voltStream[i + dataStart] = this.volt;
      }
    }
  }


}
