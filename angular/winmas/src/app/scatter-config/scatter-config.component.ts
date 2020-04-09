import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-scatter-config',
  templateUrl: './scatter-config.component.html',
  styleUrls: ['./scatter-config.component.css']
})
export class ScatterConfigComponent {
  //date = new FormControl(new Date());
  configForm = this.fb.group({
    firstName: [null, Validators.required],
    startDate: [new Date(), Validators.required],
    mode: ['manual-mode', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
