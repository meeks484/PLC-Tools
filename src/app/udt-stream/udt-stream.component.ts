
import {Component, OnInit} from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
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
export class UDTStreamComponent implements OnInit {
  csvRecords: any;
  header: boolean = false;
  fileUploaded: boolean;
  boolStream: IStreamType;
  sintStream: IStreamType;
  intStream: IStreamType;
  dintStream: IStreamType;
  tagStream: IStreamType;


  acceptedTypes: any[][] = [
    ["pressureInRange","BOOL"],
    ["pressureAlarm","SINT"],
    ["chamberStatus","SINT"],
    ["Auxiliary Sensors","INT[5]"],
    ["chamberPressure","DINT"],
    ["pressureMsg","STRING10"]
  ];

  constructor(private ngxCsvParser: NgxCsvParser) {

  }

  ngOnInit() {
    this.convertToStream(this.acceptedTypes)
  }

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
          next: (result: any[] | NgxCSVParserError) => {
            console.log('Result', result)
            this.csvRecords = result;

            this.convertToStream(result)
          },
          error: (error) => {
            console.log('Error', error)
          }
        }
      );

  }

  convertToStream(udtData: any){
    let tagStream: StreamTags = new StreamTags(udtData)
    this.boolStream = new StreamBool(tagStream.bitSize)
    this.sintStream = new StreamSint(tagStream.bitSize)
    this.intStream = new StreamInt(tagStream.bitSize)
    this.dintStream = new StreamDint(tagStream.bitSize)
    this.tagStream = tagStream;
  }

}
