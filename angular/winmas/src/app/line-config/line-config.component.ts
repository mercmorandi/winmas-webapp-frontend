import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { LineService } from '../line.service';

@Component({
  selector: 'app-line-config',
  templateUrl: './line-config.component.html',
  styleUrls: ['./line-config.component.css']
})
export class LineConfigComponent {
  @Output() date = new EventEmitter<number>();

  constructor(private message: MessageService) {}

  ngOnInit() {
    //this.message.success(this.date + this.dateControl.value);
  }

  setDate(selectedDate: Date) {
    let date = Math.trunc(selectedDate.getTime()/1000);
    console.log("send:", date, selectedDate)
    this.date.emit(date);
  }
}
