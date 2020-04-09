import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-scatter-config',
  templateUrl: './scatter-config.component.html',
  styleUrls: ['./scatter-config.component.css']
})
export class ScatterConfigComponent {
  darkTheme = {
    container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#555',
    },
    clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff'
    }
};
  //date = new FormControl(new Date());
  date = new Date();
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
