
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import {CONSTRUCTOR} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";
import {FOUR} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-udt-stream',
  templateUrl: './udt-stream.component.html',
  styleUrls: ['./udt-stream.component.css']
})
export class UDTStreamComponent {
  csvRecords: any
  header: boolean = false;
  bitColumn: number[];
  sintColumn: number[];
  intColumn: number[];
  dintColumn: number[];
  tagColumn: string[];
  constructor(private ngxCsvParser: NgxCsvParser) {}

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header =
      (this.header as unknown as string) === 'true' ||
      this.header === true;

    this.ngxCsvParser
      .parse(files[0], {
        header: this.header,
        delimiter: ',',
        encoding: 'utf8'
      })
      .pipe()
      .subscribe({
          next: (result: any[]|NgxCSVParserError) => {
            console.log('Result',result)
            this.csvRecords=result;
            this.convertToStream()
          },
          error: (error) => {
            console.log('Error',error)
          }
        }
      );



  }
  convertToStream(){
    const BIT_SIZE: number = 1;
    const ONE_BYTE_SIZE: number = 8;
    const TWO_BYTE_SIZE: number = ONE_BYTE_SIZE*2;
    const FOUR_BYTE_SIZE: number = ONE_BYTE_SIZE*4;
    let isArray: boolean = false;
    let bitSize: number=0;
    let i: number;
    let m: number=0;
    let tagColumns: string[]=[];
    for (i=0;i<this.csvRecords.length;i++){
      let tag: string = this.csvRecords[i][1];
      let arraySize: number;
      let dataType: string;
      if (tag.includes("]")){
        arraySize= this.getArraySize(tag);
        dataType= tag.slice(0,tag.indexOf("["));
        isArray=true;
      }else{
        arraySize=1;
        dataType=tag;
        isArray=false;
      }
      let testNum: number = 4;

      for (let j = 0; j<arraySize; j++){
        if (isArray){
          tagColumns[m]=this.csvRecords[i][0]+"["+j+"]"
        }else{
          tagColumns[m]=this.csvRecords[i][0]
        }
        ++m;
        switch(dataType){
          case "BOOL":
              bitSize = bitSize+BIT_SIZE;
              break;
          case "SINT":
          case "USINT":
          case "STRING":
              bitSize = bitSize+ONE_BYTE_SIZE;
              break;
          case "INT":
          case "UINT":
              bitSize = bitSize+TWO_BYTE_SIZE;
              break;
          case "DINT":
          case "UDINT":
          case "REAL":
              bitSize = bitSize+FOUR_BYTE_SIZE;
              break;
        }
      }

    }
    let num4Bytes: number = Math.ceil(bitSize/FOUR_BYTE_SIZE);
    this.bitColumn = Array.from(Array(num4Bytes*FOUR_BYTE_SIZE).keys())
    this.sintColumn= Array.from(Array(num4Bytes*4).keys())
    this.intColumn=Array.from(Array(num4Bytes*2).keys())
    this.dintColumn=Array.from(Array(num4Bytes).keys())
    this.tagColumn=tagColumns;

  }

  getArraySize(tag: string): number{

    return Number(tag.slice(tag.indexOf("[")+1,tag.indexOf("]")))

  }





}




