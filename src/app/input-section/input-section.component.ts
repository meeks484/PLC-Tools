import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Binary} from "../Binary";
import {IType} from "../typeClasses/IType";
import {SintType} from "../typeClasses/SintType";
import {BoolType} from "../typeClasses/BoolType";
import {UsintType} from "../typeClasses/UsintType";
import {IntType} from "../typeClasses/IntType";
import {UintType} from "../typeClasses/UintType";
import {DintType} from "../typeClasses/dintType";
import {UdintType} from "../typeClasses/UdintType";
import {StringType} from "../typeClasses/StringType";
import {FloatType} from "../typeClasses/FloatType";

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.css']
})
export class InputSectionComponent{
@Output() dataChangedOut = new EventEmitter<any>();
@Output() typeOut = new EventEmitter<IType>();

  typeObj: IType;
  dataType: string
  dataChanged: boolean;
  headers: string[][] = Array(4)


  constructor() {
    this.dataType=Binary.DEFAULT_TYPE
    this.typeObj = new BoolType()
  }

  onSelected(value:string): void {
    switch (value){
      case "BOOL":
        this.typeObj = new BoolType(); break;
      case "SINT":
        this.typeObj = new SintType(); break;
      case "USINT":
        this.typeObj = new UsintType(); break;
      case "INT":
        this.typeObj = new IntType(); break;
      case "UINT":
        this.typeObj = new UintType(); break;
      case "DINT":
        this.typeObj = new DintType(); break;
      case "UDINT":
        this.typeObj = new UdintType(); break;
      case "STRING":
        this.typeObj = new StringType(); break;
      case "REAL":
        this.typeObj = new FloatType(); break;
    }

    this.dataType = value;
    this.dataChangedSwitch()
    this.typeOut.emit(this.typeObj)
  }

  catchTypeObj(typeObj: IType){
      this.typeObj = typeObj;
      this.dataChangedSwitch()
      this.typeOut.emit(this.typeObj)
  }

  dataChangedSwitch(){
    this.dataChanged = !this.dataChanged;
    this.dataChangedOut.emit(this.dataChanged)
  }

}
