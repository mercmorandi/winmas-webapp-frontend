import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Dates } from '../models/dates';

@Component({
  selector: 'app-scatter-config',
  templateUrl: './scatter-config.component.html',
  styleUrls: ['./scatter-config.component.css']
})
export class ScatterConfigComponent {
  //date = new FormControl(new Date());
  configScatterForm = this.fb.group({
    firstName: [null, Validators.required],
    startDate: [new Date(), Validators.required],
    mode: ['manual-mode', Validators.required]
  });

  private start_date: number;
  private end_date: number;

  disabled:boolean = true
  min_date:Date = new Date()

  @Output() dates: EventEmitter<Dates> = new EventEmitter<Dates>()

  constructor(private fb: FormBuilder, private message: MessageService) { }

  onSubmit() {
    this.message.success('Thanks!');
    this.dates.emit({start_date: this.start_date, end_date: this.end_date})
  }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.message.success(`${type}: ${event.value}`);
  // }

  setDate(selectedDate: Date, type) {
    if (type == 'start_date') {
      this.disabled = false
      this.min_date = selectedDate
      this.start_date = Math.trunc(selectedDate.getTime() / 1000);
      //this.message.success("Selected start_date :\n" + new Date(this.start_date * 1000) + "\n(" + this.start_date + ")");
    }else{
      this.end_date = Math.trunc(selectedDate.getTime() / 1000);
      //this.message.success("Selected end_date:\n" + new Date(this.end_date * 1000) + "\n(" + this.end_date + ")");
    }
  }
}
