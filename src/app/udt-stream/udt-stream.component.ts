
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import {CONSTRUCTOR} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";
import {FOUR} from "@angular/cdk/keycodes";
import {IStreamType} from "../streamTypes/IStreamType";
import {StreamTags} from "../streamTypes/StreamTags";
import {StreamBool} from "../streamTypes/StreamBool";
import {StreamSint} from "../streamTypes/StreamSint";
import {StreamInt} from "../streamTypes/StreamInt";
import {StreamDint} from "../streamTypes/StreamDint";

@Component({
  selector: 'app-udt-stream',
  templateUrl: './udt-stream.component.html',
  styleUrls: ['./udt-stream.component.css']
})
export class UDTStreamComponent {
  acceptedTypes: string[][] = [
    ["pressureInRange","BOOL"],
    ["pressureAlarm","BOOL[32]"],
    ["chamberPressure","DINT"],
    ["pressureMsg","STRING10"],
  ]

  csvRecords: any
  header: boolean = false;
  boolStream: IStreamType;
  sintStream: IStreamType;
  intStream: IStreamType;
  dintStream: IStreamType;
  tagStream: IStreamType;
  fileUploaded: boolean;

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
    let initialTag: StreamTags;
    initialTag = new StreamTags(this.csvRecords);

    let bitSize = initialTag.bitSize;
    this.boolStream = new StreamBool(bitSize);
    this.sintStream = new StreamSint(bitSize);
    this.intStream = new StreamInt(bitSize);
    this.dintStream = new StreamDint(bitSize);
    this.tagStream = initialTag;
    this.fileUploaded = !this.fileUploaded;
  };







}




