
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-udt-stream',
  templateUrl: './udt-stream.component.html',
  styleUrls: ['./udt-stream.component.css']
})
export class UDTStreamComponent {
  csvRecords: any[] = [];
  header: boolean = false;

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
      .subscribe(
        (result: Array<any>) => {
          console.log('Result', result);
          this.csvRecords = result;
          return this.csvRecords
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }
}
