import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BitTypeConversionService {
//
//   constructor() { }
//
//   integerToBinary(bitArray: number[],intNumber: number) {
//
//     let i: number = 0;
//     while ( intNumber > 0){
//       bitArray[i]= intNumber % 2;
//       intNumber = Math.floor(intNumber / 2);
//       i++;
//     }
//   }
//
//   signedInteger(bitArray: number[], intNumber: number){
//     this.integerToBinary(bitArray,Math.abs(intNumber));
//     if (intNumber < 0 ){
//       this.twoComplimentSwitch(bitArray)
//     }
//   }
//
//   signedBinaryToDecimal(bitArray: number[]): number{
//     if (bitArray[bitArray.length-1] == 1){
//       this.twoComplimentSwitch(bitArray)
//       return this.binaryToDecimal(bitArray) * (-1);
//     }else{
//       return this.binaryToDecimal(bitArray);
//     }
//   }
//
//   binaryToDecimal(bitArray: number[]): number{
//     let decimal: number = 0;
//
//     for (let index = 0; index < bitArray.length; index++){
//       decimal += bitArray[index]*(2**index);
//     }
//
//     return decimal;
//   }
//
//
//   moveToArray(bitArray1: number[], bitArray2: number[], startIndex: number){
//     for (let index: number = 0; index < bitArray2.length; index++){
//       bitArray1[index + startIndex] = bitArray2[index];
//     }
//     bitArray2.fill(0);
//   }
//
//   parseBit(
//     bitArray: number[],
//     startIndex: number,
//     span: number): number[]{
//
//       let parsedArray = new Array(span).fill(0);
//       for (let index: number = 0; index < span; index++){
//         parsedArray[index] = bitArray[index + startIndex];
//       }
//       return parsedArray;
//     }
//
//   integerToAscii(integer: number): string{
//     return String.fromCharCode(integer);
//   }
//
//   private twoComplimentSwitch(bitArray: number[]){
//     for (let index = 0; index < bitArray.length; index++){
//       (bitArray[index]) ? bitArray[index] = 0 : bitArray[index] = 1;
//     }
//
//     for (let index = 0; index < bitArray.length; index++){
//       if (bitArray[index] == 1){
//         bitArray[index] = 0;
//       } else {
//         bitArray[index] = 1;
//         break;
//       }
//     }
//   }
//
}
