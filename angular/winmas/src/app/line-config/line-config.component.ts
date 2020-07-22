import { Component } from '@angular/core';
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

  public date: number;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Moment;
  public maxDate: Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  public dateControl = new FormControl(this.date);

  constructor(private message: MessageService,
              private lineService: LineService) {}

  ngOnInit() {
    //this.message.success(this.date + this.dateControl.value);
  }

  setDate(selectedDate: Date) {
    this.date = Math.trunc(selectedDate.getTime()/1000);
    this.submitDate();
  }

  submitDate(){
    this.message.success("Waiting Data for:\n" + new Date(this.date*1000) + "\n(" + this.date + ")");
    this.lineService.getStats(this.date);
  }
}
