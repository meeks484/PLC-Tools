import {Component, Input, OnInit,OnChanges,SimpleChanges,} from '@angular/core';
import {A} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css']
})
export class OutputTableComponent implements OnInit,OnChanges {
  @Input() selectedType: string;
  @Input() bytes: number[][];
  @Input() dataChanged: boolean;

  private eightBits: number[][];
  private sixteenBits: number[][];
  private thirtyTwoBits: number[][];

  constructor() { }

  ngOnInit(): void {
    this.eightBits=Array(4);
    this.sixteenBits=Array(2);
    this.thirtyTwoBits=Array(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    switch (this.selectedType){
      case "BOOL":
        this.typeBool()
        break;
      case "SINT":
      case "USINT":
        this.typeSINT()
        break;
      case "INT":
      case "UINT":
        this.typeINT()
        break;
      case "DINT":
        this.typeDINT()
        break;
    }

  }

  private typeBool(){
    for (let i = 0; i<4; i++){
      this.eightBits[i]=this.bytes[i]
    }
    this.getSixteenCombine()
    this.getThirtyTwo()
  }

  private typeSINT(){
    for (let i=0; i<4; i++){
      this.eightBits[i] = this.typeToBinary(this.bytes[i][0],8)
    }
    this.getSixteenCombine()
    this.getThirtyTwo()
  }

  private typeINT(){
    for (let i=0; i<2; i++){
      this.sixteenBits[i] = this.typeToBinary(this.bytes[i][0],16);
    }
    this.getEight()
    this.getThirtyTwo()
  }

  private typeDINT(){
    this.thirtyTwoBits[0] = this.typeToBinary(this.bytes[0][0],32)
    this.getSixteenSplit()
    this.getEight()
  }

  private getEight(){
    this.eightBits[0]=this.splitBits(this.sixteenBits[0])[0]
    this.eightBits[1]=this.splitBits(this.sixteenBits[0])[1]
    this.eightBits[2]=this.splitBits(this.sixteenBits[1])[0]
    this.eightBits[3]=this.splitBits(this.sixteenBits[1])[1]
  }

  private getSixteenCombine(){
    this.sixteenBits[0]=this.combineBits(this.eightBits[0],this.eightBits[1])
    this.sixteenBits[1]=this.combineBits(this.eightBits[2],this.eightBits[3])
  }

  private getSixteenSplit(){
    this.sixteenBits[0]=this.splitBits(this.thirtyTwoBits[0])[0]
    this.sixteenBits[1]=this.splitBits(this.thirtyTwoBits[0])[1]
  }

  private getThirtyTwo(){
    this.thirtyTwoBits[0]=this.combineBits(this.sixteenBits[0],this.sixteenBits[1])
  }

  private splitBits(bits: number[]): number[][]{
    let half: number;
    half = bits.length/2;
    let result: number[][];
    result = Array(2);
    result[0]=Array(half).fill(0)
    result[1]=Array(half).fill(0)
    for (let i = 0; i<half;i++){
      result[0][i]=bits[i];
      result[1][i]=bits[i+half];
    }

    return result;
  }


  private combineBits(bits1: number[], bits2: number[]): number[]{
    let result: number[]
    result= Array(bits1.length+bits2.length).fill(0);

    for (let i = 0; i<bits1.length;i++){
      result[i] = bits1[i];
      result[i+bits1.length]=bits2[i]
    }
    return result;
  }

  private typeToBinary(value: number, bitCount: number): number[]{
    let result: number[]=this.integerToBinary(Math.abs(value), bitCount)

    if (value < 0 )
      this.twoComplimentSwitch(result);

    return result;
  }

  private twoComplimentSwitch(bitArray: number[]){
    for (let index = 0; index < bitArray.length; index++){
      (bitArray[index]) ? bitArray[index] = 0 : bitArray[index] = 1;
    }

    for (let index = 0; index < bitArray.length; index++){
      if (bitArray[index] == 1){
        bitArray[index] = 0;
      } else {
        bitArray[index] = 1;
        break;
      }
    }

  }

  private integerToBinary(value: number, bitCount?: number): number[] {
    let result: number[];
    if (typeof bitCount == 'undefined')
      result = Array(this.getDimensions(value)).fill(0);
    else
      result = Array(bitCount).fill(0);

    let i: number = 0;
    while ( value > 0){
      result[i]= value % 2;
      value = Math.floor(value / 2);
      i++;
    }
    return result;

  }
  getDimensions(value: number): number {
    for (let i = 0; i < 31; i++) {
      if (value < 2 ** i)
        return i

    }
    return 0
  }


  //convert from decimal to binary
  //Need to have four representations of hte binary, thirty two 1 bits, four 8 bits, two 16 bits, one 32 bit.
  //Convert each binary set into a decimal
  //
}
