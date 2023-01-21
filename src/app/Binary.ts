import { Injectable } from '@angular/core';
import {count} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class Binary {
  public what: number

  public static ONE_BIT: number = 1
  public static EIGHT_BITS: number = 8;
  public static SIXTEEN_BITS: number = 16;
  public static THIRTY_TWO_BITS: number = 32;
  public static ONE_BYTE: number = 1;
  public static TWO_BYTES: number = 2;
  public static FOUR_BYTES: number = 4;
  public static BOOL: string = "BOOL";
  public static SINT: string = "SINT";
  public static USINT: string = "USINT";
  public static INT: string = "INT";
  public static UINT: string ="UINT";
  public static DINT: string = "DINT";
  public static UDINT: string = "UDINT";
  public static STRING: string = "STRING";
  public static DEFAULT_STATE: boolean = false;
  public static DEFAULT_TYPE: string = Binary.BOOL;


  constructor() { }

  public static minDec(dataType: string): number{
    if (this.signed(dataType))
      return this.minSigned(this.bitCount(dataType))
    else
      return 0;
  }

  public static maxDec(dataType: string): number{
    if (this.signed(dataType))
      return this.maxSigned(this.bitCount(dataType))
    else
      return this.maxUnsigned(this.bitCount(dataType))
  }

  private static maxSigned(bitCount: number): number{
    return ((2**bitCount) / 2) - 1;
  }

  private static minSigned(bitCount: number): number{
    return (-1) * ((2**bitCount) / 2)
  }

  private static maxUnsigned(bitCount: number): number{
    return (2**bitCount) - 1;
  }


  public static bitCount(dataType: string): number{
    switch (dataType){
      case Binary.BOOL:
        return Binary.ONE_BIT;
        break;
      case Binary.SINT:
      case Binary.USINT:
        return Binary.EIGHT_BITS
        break;
      case Binary.INT:
      case Binary.UINT:
        return Binary.SIXTEEN_BITS
        break;
      case Binary.DINT:
      case Binary.UDINT:
        return Binary.THIRTY_TWO_BITS
        break;
      default:
        return 0;
    }
  }

  public static signed(dataType: string): boolean{
    switch (dataType){
      case Binary.SINT:
      case Binary.INT:
      case Binary.DINT:
        return true;
      default:
        return false;
    }
  }

  public static get32bits(dataType: string, data: any[][]): number[]{
    let result: number[] = Array(32).fill(0)
    let bitArray: number[][] = Array(4);
    if (dataType == Binary.BOOL){
      result = this.bytesTo32Bits(data,4);
    } else if (dataType == Binary.SINT || dataType == Binary.USINT) {
      for (let i = 0; i < Binary.FOUR_BYTES; ++i) {
        bitArray[i] = this.typeToBinary(data[0][i], Binary.EIGHT_BITS)
      }
      result = this.bytesTo32Bits(bitArray, 4);
    }
    else if (dataType == Binary.INT || dataType == Binary.UINT){
      bitArray[0] = this.typeToBinary(data[0][0], Binary.SIXTEEN_BITS)
      bitArray[1] = this.typeToBinary(data[0][1], Binary.SIXTEEN_BITS)
      result = this.bytesTo32Bits(bitArray, 2);
    }
    else if (dataType==Binary.DINT || dataType == Binary.UDINT){
      bitArray[0] = this.typeToBinary(data[0][0], Binary.THIRTY_TWO_BITS)
      result = this.bytesTo32Bits(bitArray, 1);
    }
    else if (dataType == Binary.STRING){
      for (let i = 0; i < Binary.FOUR_BYTES; ++i){
        let sint: number = data[0][i].charCodeAt(0)
        bitArray[i] = this.typeToBinary(sint, Binary.EIGHT_BITS)
      }
      result = this.bytesTo32Bits(bitArray,4)
    }
    return result
  }

  public static getBitsFrom32(thirtyTwo: number[],countPer32: number, bitCount: number): number[][]{
    const BITS_32: number = 32
    let result: number[][] = Array(countPer32)
    for (let i = 0; i < BITS_32; ++i){
      result[i] = Array(bitCount)
      let dim1: number = Math.floor(i / (BITS_32 / countPer32));
      let dim2: number = i - dim1 * (BITS_32 / countPer32);
      result[dim1][dim2] = thirtyTwo[i];
    }
    return result
  }

public static bytesTo32Bits(data: number[][], byteCount: number): number[]{
    let result: number[] = Array(32)
    for (let i = 0; i<Binary.THIRTY_TWO_BITS; ++i){
      let dim1: number = Math.floor(i / (Binary.THIRTY_TWO_BITS / byteCount));
      let dim2: number = i - dim1 * (Binary.THIRTY_TWO_BITS / byteCount);
      result[i] = data[dim1][dim2];
    }
    return result;
}


  public static typeToBinary(value: number, bitCount: number): number[]{
    let result: number[]=this.integerToBinary(Math.abs(value), bitCount)

    if (value < 0 )
      this.twoComplimentSwitch(result);

    return result;
  }

  public static twoComplimentSwitch(bitArray: number[]){
    this.invertBits(bitArray)
    this.addOne(bitArray)
  }

  private static invertBits(bitArray: number[]){
    for (let index = 0; index < bitArray.length; index++){
      (bitArray[index] == 1) ? bitArray[index] = 0 : bitArray[index] = 1;
    }
  }

  private static addOne(bitArray: number[]){
    for (let index = 0; index < bitArray.length; index++){
      if (bitArray[index] == 1){
        bitArray[index] = 0;
      } else {
        bitArray[index] = 1;
        break;
      }
    }
  }

  private static subtractOne(bitArray: number[]){
    for (let index = 0; index < bitArray.length; index++){
      if (bitArray[index] == 0){
        bitArray[index] = 1;
      } else {
        bitArray[index] = 0;
        break;
      }
    }
  }

  public static signedIntegerToBinary(value: number, bitCount?: number): number[]{
    let negative: boolean;
    value < 0? negative = true : negative = false;

    let result: number[];
    result = this.integerToBinary(Math.abs(value),bitCount)

    if (negative) {
      this.subtractOne(result);
      this.invertBits(result);
    }
    return result;
  }

  public static integerToBinary(value: number, bitCount?: number): number[] {
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

  public static getDimensions(value: number): number {
    for (let i = 0; i < 31; i++) {
      if (value < 2 ** i)
        return i

    }
    return 0
  }

  private static copyArray(arrayIn: number[]): number[]{
    let result: number[] = Array(arrayIn.length)
    for (let i=0;i<arrayIn.length;++i){
        result[i]=arrayIn[i]
    }
    return result;
  }

  public static signedBinaryToDecimal(bitArray: number[]): number{
    let bitRef: number[] = bitArray.slice()
    if (bitArray[bitArray.length-1] == 1){
      this.twoComplimentSwitch(bitRef)
      return this.binaryToDecimal(bitRef) * (-1);
    }else{
      return this.binaryToDecimal(bitRef);
    }
  }

  public static binaryToDecimal(bitArray: number[]): number{
    let decimal: number = 0;

    for (let index = 0; index < bitArray.length; index++){
      decimal += bitArray[index]*(2**index);
    }

    return decimal;
  }

  public static integerToAscii(integer: number): string{
    return String.fromCharCode(integer);
  }


}
