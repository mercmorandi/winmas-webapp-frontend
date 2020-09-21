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
  configLineForm = this.fb.group({
    startDate: [new Date(), Validators.required],
  });
  private start_date: number;

  @Output() date = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    //this.message.success(this.date + this.dateControl.value);
  }

  onSubmit() {
    this.date.emit(this.start_date);
  }

  setDate(selectedDate: Date, type) {
    let date = Math.trunc(selectedDate.getTime()/1000);
    console.log("send:", date, selectedDate)
    if (type == 'start_date') {
      let date = Math.trunc(selectedDate.getTime()/1000);
      this.start_date = date;
      this.date.emit(date);
    }
  }
}
