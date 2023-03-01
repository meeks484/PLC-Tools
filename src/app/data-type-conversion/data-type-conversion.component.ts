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
  typeCompare: string[][] = [
    ["Type of Data","Size (bits)","min","max","Name"],
    ["Boolean","1","0","1","BOOL"],
    ["Unsigned Integer","8","0","255","BYTE/USINT"],
    ["Unsigned Integer","16","0","65535","WORD/UINT"],
    ["Unsigned Integer", "32","0","4294967295","DWORD/UDINT"],
    ["Signed Integer","8","-128","127","SINT"],
    ["Signed Integer","16","-32768","32767","INT"],
    ["Signed Integer","32", "-2147483648","2147483647","DINT"],
    ["Floating Point","32","-1.16E-38","3.40E+38","REAL"],
    ["Character","8","N/A","N/A","STRING"]


  ];

  constructor() {}

  catchType(type: IType){
    this.typeObj = type;
  }

  catchDataChange(dataChanged: boolean){
    this.dataChanged = dataChanged;
  }

  typeTable(){
    let newArray: any =  this.typeCompare.map(x => x[0])
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(x => ({
        name: x,
        data: this.typeCompare.filter(y => y[0] === x)
      }))
    return newArray
  }


}
