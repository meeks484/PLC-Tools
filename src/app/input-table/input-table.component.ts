import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import {Binary} from "../Binary";
import {IType} from "../typeClasses/IType";
import {SintType} from "../typeClasses/SintType";
import {BoolType} from "../typeClasses/BoolType";

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.css']
})
export class InputTableComponent implements OnChanges{
  @Input() dataType: string
  //@Input() show: boolean
  //@Input() headers: string[]
  @Input() typeObj: IType;
  @Input() tableNum: number;
  //@Output()  inputsOut = new EventEmitter<any>();
  @Output() typeOut = new EventEmitter<IType>();

  inputs: any[] = [];
  characterCount: number
  dataWidth: number;
  headers: string[]
  show: boolean;
  constructor() {
    this.typeObj = new BoolType();
    this.inputs = Array(Binary.EIGHT_BITS).fill(0);
    this.headers = Array(8)
    this.buildBoolHeads();
  }

  trackByFn(index: any, item: any){
    return index;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.dataType == "BOOL") {
      this.inputs = Array(8).fill(0);
      this.headers = Array(8);
      this.buildBoolHeads();
    }
    else {
      this.inputs = this.typeObj.typeValues
      this.headers = this.typeObj.rowHeaders
    }

    this.characterCount = this.typeObj.characterCount;
    this.dataWidth = this.characterCount * 10;
    this.show = this.typeObj.show[this.tableNum]
  }

  valueEntry(index: number){
    let realIndex: number;
    if (this.dataType == "BOOL")
      realIndex = index + this.tableNum * 8;
    else
      realIndex = index;
    this.typeObj.insertValue(this.inputs[index], realIndex)
    this.inputs[index] = this.typeObj.typeValues[index];
    this.typeOut.emit(this.typeObj);
  }

  buildBoolHeads(){
    for (let i = 0; i < 8; ++i) {
      let headerIndex: number = i + 8 * this.tableNum;
      this.headers[i] = this.typeObj.rowHeaders[headerIndex]
    }
  }
}
