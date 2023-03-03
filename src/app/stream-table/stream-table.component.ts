import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IStreamType} from "../streamTypes/IStreamType";

@Component({
  selector: 'app-stream-table',
  templateUrl: './stream-table.component.html',
  styleUrls: ['./stream-table.component.css']
})
export class StreamTableComponent implements OnChanges{
  @Input() streamTable: IStreamType;
  @Input() fileUploaded: boolean;
  arrayStream: string[];
  rowSpan: number[];
  firstRead: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges){
        this.arrayStream = this.streamTable.arrayStream;
        this.rowSpan = this.streamTable.rowSpan;
  }
}
