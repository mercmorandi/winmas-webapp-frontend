import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-proxy-status',
  templateUrl: './proxy-status.component.html',
  styleUrls: ['./proxy-status.component.css']
})
export class ProxyStatusComponent implements OnInit {

  @Input() messages
  @Input() current_status
  constructor() { }

  ngOnInit(): void {
  }

}
