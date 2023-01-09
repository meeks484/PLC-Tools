import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.css']
})
export class InputTableComponent implements OnInit,OnChanges{
  @Input() selectedType: string
  @Output()  inputsEvent = new EventEmitter<any>();


  inputs: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.inputs = Array(8).fill(0);
  }

  trackByFn(index: any, item: any){
    return index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedType == "BOOL")
      this.inputs = Array(8).fill(0);
    else
      this.inputs = Array(1).fill(0);
    this.inputsEvent.emit(this.inputs);
  }


  valueEntry(){

    this.inputsEvent.emit(this.inputs);
  }

}
