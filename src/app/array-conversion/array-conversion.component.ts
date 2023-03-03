import { Component, OnInit } from '@angular/core';
import {BoolType} from "../typeClasses/BoolType";
import {SintType} from "../typeClasses/SintType";
import {UsintType} from "../typeClasses/UsintType";
import {IntType} from "../typeClasses/IntType";
import {UintType} from "../typeClasses/UintType";
import {DintType} from "../typeClasses/dintType";
import {UdintType} from "../typeClasses/UdintType";
import {StringType} from "../typeClasses/StringType";
import {FloatType} from "../typeClasses/FloatType";

@Component({
  selector: 'app-array-conversion',
  templateUrl: './array-conversion.component.html',
  styleUrls: ['./array-conversion.component.css']
})
export class ArrayConversionComponent implements OnInit {
  integerIndex: number = 0;
  bitIndex: number = 0;
  bitNumber: number = 0;
  setBitNumber: number = 0;
  arrayIndex: number = 0;
  getBitIndex: number = 0;
  integerType: string = "8";
  bitType: string = "8";

  constructor() { }

  ngOnInit(): void {
  }

  calcBitNumber() {
    let intSize: number = +this.integerType;
    this.integerIndex = Math.floor(this.integerIndex);
    if (this.integerIndex < 0)
      this.integerIndex = 0;

    this.bitIndex = this.inputAdjust(this.bitIndex, intSize)
    this.bitNumber = this.integerIndex * intSize + this.bitIndex;

  }


  bitNumberEntry(){
    let intSize: number = +this.bitType;

    if (this.setBitNumber < 0)
      this.setBitNumber = 0;

    this.arrayIndex = Math.floor(this.setBitNumber / intSize);
    this.getBitIndex = this.setBitNumber % intSize;
  }

  integerSelected(value:string): void {
    this.integerType = value;
    this.calcBitNumber();
  }

  bitSelected(value: string): void {
    this.bitType = value;
    this.bitNumberEntry();
  }

  inputAdjust(input: number, size: number): number{
    if (input < 0)
      return 0;
    else if (input > size -1)
      return size - 1;
    else
      return Math.floor(input);
  }
}
