import {Component, Input, OnInit,  OnChanges, SimpleChanges,} from '@angular/core';
import {IType} from "../typeClasses/IType";
import {BoolType} from "../typeClasses/BoolType";
import {SintType} from "../typeClasses/SintType";
import {UsintType} from "../typeClasses/UsintType";
import {IntType} from "../typeClasses/IntType";
import {UintType} from "../typeClasses/UintType";
import {DintType} from "../typeClasses/dintType";
import {UdintType} from "../typeClasses/UdintType";
import {StringType} from "../typeClasses/StringType";
import {FloatType} from "../typeClasses/FloatType";

@Component({
  selector: 'app-output-section',
  templateUrl: './output-section.component.html',
  styleUrls: ['./output-section.component.css']
})
export class OutputSectionComponent implements OnChanges{
  @Input() dataChanged: boolean;
  @Input() typeObj: IType;

  BOOL: IType;
  SINT: IType;
  USINT: IType;
  INT: IType;
  UINT: IType;
  DINT: IType;
  UDINT: IType;
  STRING: IType;
  REAL: IType;

  constructor() {
    this.typeObj = new BoolType()
    this.createTypes()
  }

  createTypes(){
    this.BOOL = new BoolType(this.typeObj.thirtyTwo);
    this.SINT = new SintType(this.typeObj.thirtyTwo);
    this.USINT = new UsintType(this.typeObj.thirtyTwo);
    this.INT = new IntType(this.typeObj.thirtyTwo);
    this.UINT = new UintType(this.typeObj.thirtyTwo);
    this.DINT = new DintType(this.typeObj.thirtyTwo);
    this.UDINT = new UdintType(this.typeObj.thirtyTwo);
    this.STRING = new StringType(this.typeObj.thirtyTwo);
    this.REAL = new FloatType(this.typeObj.thirtyTwo);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.typeObj !== undefined)
      this.createTypes();
  }
}
