import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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

  private date: number;

  constructor(private fb: FormBuilder, private message: MessageService) {}

  onSubmit() {
    this.message.success('Thanks!');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.message.success(`${type}: ${event.value}`);
  }

  setDate(selectedDate: Date) {
    this.date = Math.trunc(selectedDate.getTime()/1000);
    this.message.success("Selected :\n" + new Date(this.date*1000) + "\n(" + this.date + ")");
  }
}
