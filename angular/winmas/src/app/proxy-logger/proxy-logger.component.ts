import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-proxy-logger',
  templateUrl: './proxy-logger.component.html',
  styleUrls: ['./proxy-logger.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProxyLoggerComponent implements OnInit {

  @Input() locations

  constructor() { }

  ngOnInit(): void {
  }

}
