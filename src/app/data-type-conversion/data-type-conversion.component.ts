import {Component, OnInit, ViewChild} from '@angular/core';
import { BitTypeConversionService } from '../bit-type-conversion.service';
import {InputTableComponent} from "../input-table/input-table.component";

@Component({
  selector: 'app-data-type-conversion',
  templateUrl: './data-type-conversion.component.html',
  styleUrls: ['./data-type-conversion.component.css']
})
export class DataTypeConversionComponent implements OnInit {


  bitArray: number[] = [];
  SINT: number[] = [];
  USINT: number[] = [];
  ASCII: string[] = [];
  INT: number[] = [];
  UINT: number[] = [];
  DINT: number = 0;

  selectedType: string = '';
  newData: number[][];
  dataChanged: boolean;

  constructor() {}

  ngOnInit(): void {
  this.newData=Array(4)
    this.newData[0]=Array(8).fill(0)
    this.newData[1]=Array(8).fill(0)
    this.newData[2]=Array(8).fill(0)
    this.newData[3]=Array(8).fill(0)
  }
	onSelected(value:string): void {
    this.selectedType=value;
	}



  newData1(inputs: number[]){
    this.newData[0]=inputs;
    this.dataChangedSwitch()
  }

  newData2(inputs: number[]){
    this.newData[1]=inputs;
    this.dataChangedSwitch()
  }

  newData3(inputs: number[]){
    this.newData[2]=inputs;
    this.dataChangedSwitch()
  }

  newData4(inputs: number[]){
    this.newData[3]=inputs;
    this.dataChangedSwitch()
  }

  dataChangedSwitch(){
    if (this.dataChanged)
      this.dataChanged=false
    else
      this.dataChanged=true
  }
  // valueEntry(){
  //   if (this.selectedType == "SINT")
  //     this.signedSingleInteger()
  //   else if (this.selectedType == "USINT")
  //     this.unsignedSingleInteger()
  //   else if (this.selectedType == "INT")
  //     this.signedInteger()
  //   else if (this.selectedType == "UINT")
  //     this.unsignedInteger()
  //   else if (this.selectedType == "DINT")
  //     this.signedDoubleInteger()
  //   else if (this.selectedType == "STRING")
  //     this.convertedOutput()
  // }
  binaryConvert(){

  }
  convertToAscii(){

  }
  // signedSingleInteger(){
  //   let bitArraySINT: number[] = new Array(8).fill(0);
  //   this.bitConvert.signedInteger(bitArraySINT, this.inputValue1)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 0)
  //   this.bitConvert.signedInteger(bitArraySINT, this.inputValue2)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 8)
  //   this.bitConvert.signedInteger(bitArraySINT, this.inputValue3)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 16)
  //   this.bitConvert.signedInteger(bitArraySINT, this.inputValue4)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 24)
  //   this.convertedOutput();
  // }
  //
  // unsignedSingleInteger(){
  //   let bitArraySINT: number[] = new Array(8).fill(0);
  //   this.bitConvert.integerToBinary(bitArraySINT, this.inputValue1)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 0)
  //   this.bitConvert.integerToBinary(bitArraySINT, this.inputValue2)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 8)
  //   this.bitConvert.integerToBinary(bitArraySINT, this.inputValue3)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 16)
  //   this.bitConvert.integerToBinary(bitArraySINT, this.inputValue4)
  //   this.bitConvert.moveToArray(this.bitArray, bitArraySINT, 24)
  //   this.convertedOutput();
  // }
  //
  // signedInteger(){
  //   let bitArrayINT: number[] = new Array(16).fill(0);
  //   this.bitConvert.signedInteger(bitArrayINT,this.inputValue1)
  //   this.bitConvert.moveToArray(this.bitArray,bitArrayINT,0)
  //   this.bitConvert.signedInteger(bitArrayINT,this.inputValue2)
  //   this.bitConvert.moveToArray(this.bitArray,bitArrayINT,16)
  //   this.convertedOutput();
  // }
  //
  // unsignedInteger(){
  //   let bitArrayINT: number[] = new Array(16).fill(0);
  //   this.bitConvert.integerToBinary(bitArrayINT, this.inputValue1)
  //   this.bitConvert.moveToArray(this.bitArray,bitArrayINT,0)
  //   this.bitConvert.integerToBinary(bitArrayINT, this.inputValue2)
  //   this.bitConvert.moveToArray(this.bitArray,bitArrayINT,16)
  //   this.convertedOutput();
  // }
  //
  // signedDoubleInteger(){
  //   this.bitConvert.signedInteger(this.bitArray,this.inputValue1)
  //   this.convertedOutput();
  // }
  //
  // private convertedOutput(){
  //
  //   for (let index: number = 0; index < 4; index++){
  //     this.SINT[index] = this.bitConvert.signedBinaryToDecimal(this.bitConvert.parseBit(this.bitArray,index*8,8));
  //     this.USINT[index] = this.bitConvert.binaryToDecimal(this.bitConvert.parseBit(this.bitArray,index*8,8));
  //     this.ASCII[index] = this.bitConvert.integerToAscii(this.USINT[index]);
  //     if (index < 2){
  //       this.INT[index] = this.bitConvert.signedBinaryToDecimal(this.bitConvert.parseBit(this.bitArray,index*16,16));
  //       this.UINT[index] = this.bitConvert.binaryToDecimal(this.bitConvert.parseBit(this.bitArray,index*16,16));
  //     }
  //   }
  //
  //
  //   this.DINT = this.bitConvert.signedBinaryToDecimal(this.bitConvert.parseBit(this.bitArray,0,32));
  // }
  //




  // grid: any = {

  //   rowData: [],
  //   defaultColDef: {
  //     flex: 1,
  //     minWidth: 100,
  //     sortable: true,
  //     resizable: true,
  //   },
  //   columnDefs: [
  //     { field: 'country', headerName: 'COUNTRY', rowGroup: true, hide: true },
  //     { field: 'year', rowGroup: true, hide: true },
  //     { field: 'athleteButt' },
  //     { field: 'sport' },
  //     { field: 'gold' },
  //     { field: 'silver' },
  //     { field: 'bronze' },
  //   ]
  // }
}
