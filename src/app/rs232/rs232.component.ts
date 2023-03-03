import { Component, OnInit } from '@angular/core';
import {Binary} from "../Binary";

const IDLE: number[] = Array(4).fill(1)

@Component({
  selector: 'app-rs232',
  templateUrl: './rs232.component.html',
  styleUrls: ['./rs232.component.css']
})



export class Rs232Component implements OnInit {
  command: string = "out"
  serialStream: number[];
  serialTable: any[][];


  constructor() {
    let charDecimal: number[] = Array(this.command.length);
    let charHex: string[] = Array(this.command.length);
    let charBinary: number[][] = Array(this.command.length);
    let serialTable: any[][] = Array(4)

    for (let i = 0; i < this.command.length; ++i){
      //serialTable[0].push("o")
      charDecimal[i] = this.command[i].charCodeAt(0)
      charHex[i] = charDecimal[i].toString(16)
      charBinary[i] = Binary.integerToBinary(charDecimal[i]);
      this.serialStream = this.serialStream.concat(this.buildData(charBinary[i]))
    }


    serialTable[1] = charHex
    serialTable[2] = charDecimal;
    serialTable[3] = this.serialStream;

    this.serialTable = serialTable;
  }


  buildData(charBinary: number[]): number[]{
    const beginStream: number[] = Array(1).fill(0);
    const endStream: number[] = Array(1).fill(1);
    let result: number[] = IDLE.concat(beginStream)
    result = result.concat(charBinary)
    result = result.concat(endStream)
    return result;
  }
  ngOnInit(): void {
  }

}
