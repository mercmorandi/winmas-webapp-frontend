import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scatter-details',
  templateUrl: './scatter-details.component.html',
  styleUrls: ['./scatter-details.component.css']
})
export class ScatterDetailsComponent implements OnInit {

  @Input() deviceId: number

  constructor() { }

  ngOnInit(): void {
  }

}
