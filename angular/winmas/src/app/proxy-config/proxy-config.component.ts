import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProxyConfig } from '../models/proxy-config';
import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';

export function ipValidator(control: FormControl): ValidationErrors {
  return /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
}

@Component({
  selector: 'app-proxy-config',
  templateUrl: './proxy-config.component.html',
  styleUrls: ['./proxy-config.component.css']
})
export class ProxyConfigComponent implements OnInit {

  configForm = new FormGroup({});

  proxyConfig: ProxyConfig = new ProxyConfig();


  @Input() current_status
  @Output() proxyConf: EventEmitter<any> = new EventEmitter<any>()
  @Output() stopEvent: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      ip: new FormControl(this.proxyConfig.host, [
        Validators.required,
        Validators.pattern(
          /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
        ) // <-- Here's how you pass in the custom validator.
      ]),
      port: new FormControl(this.proxyConfig.port, [
        Validators.required,
      ]),
    });
  }

  get ip() { return this.configForm.get('ip'); }
  get port() { return this.configForm.get('port'); }

  onSubmitStart() {
    console.log("premuto start")
    this.proxyConf.emit()
  }

  onSubmitStop(){
    console.log("premuto stop")
    this.stopEvent.emit()
  }

}
