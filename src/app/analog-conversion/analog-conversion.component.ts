import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analog-conversion',
  templateUrl: './analog-conversion.component.html',
  styleUrls: ['./analog-conversion.component.css']
})
export class AnalogConversionComponent implements OnInit {
  lowRawNumber: number = 0;
  highRawNumber: number = 0;
  lowProcessValue: number = 0;
  highProcessValue: number = 0;
  rawInputValue: number = 0;
  processValueOutput: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  calc(){
      let y0: number = this.lowProcessValue;
      let y1: number = this.highProcessValue;
      let x0: number = this.lowRawNumber;
      let x1: number = this.highRawNumber;
      let x: number = this.rawInputValue;

      let mSlope: number = (y1 - y0) / (x1 - x0);
      let bInt: number = y0 - x0 * mSlope;

      let y: number = mSlope * x + bInt;

      this.processValueOutput = y;
  }
}
