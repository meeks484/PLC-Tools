import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {IType} from "../typeClasses/IType";

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css']
})
export class OutputTableComponent implements OnChanges{
  @Input() typeObj: IType;
  typeName: string;
  headers: string[];
  dataWidth: number;
  data: any[];
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.headers = this.typeObj.rowHeaders
    this.dataWidth = this.typeObj.characterCount * 10;
    this.data = this.typeObj.typeValues;
    this.typeName = this.typeObj.typeName;
  }
}
