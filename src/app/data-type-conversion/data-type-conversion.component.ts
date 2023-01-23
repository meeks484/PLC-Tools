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
    ["Type of Data","Size (bits)","min","max","Allen Bradley","Seimens"],
    ["Boolean","1","0","1","BOOL","BOOL"],
    ["Unsigned Integer","8","0","255","USINT","BYTE"],
    ["Unsigned Integer","16","0","65535","UINT", "WORD"],
    ["Unsigned Integer", "32","0","4294967295","UDINT","DWORD"],
    ["Signed Integer","8","-128","127","SINT","N/A"],
    ["Signed Integer","16","-32768","32767","INT", "INT"],
    ["Signed Integer","32", "-2147483648","2147483647","DINT", "DINT"],
    ["Floating Point","32","-1.16E-38","3.40E+38","REAL","REAL"],
    ["Character","8","N/A","N/A","STRING","CHAR"]


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
    console.log(newArray)
    return newArray
  }


}
