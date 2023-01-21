import {Component} from '@angular/core';
import {IType} from "../typeClasses/IType";

@Component({
  selector: 'app-data-type-conversion',
  templateUrl: './data-type-conversion.component.html',
  styleUrls: ['./data-type-conversion.component.css']
})
export class DataTypeConversionComponent {
  typeObj: IType;
  dataChanged: boolean=false;

  constructor() {}

  catchType(type: IType){
    this.typeObj = type;
  }

  catchDataChange(dataChanged: boolean){
    this.dataChanged = dataChanged;
  }


}
