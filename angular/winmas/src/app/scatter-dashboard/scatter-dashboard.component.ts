import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EspInfo } from '../models/esp-info';
import { ScatterService } from '../scatter.service';
import { Dates } from '../models/dates';
import { Device } from '../models/device';

@Component({
  selector: 'app-scatter-dashboard',
  templateUrl: './scatter-dashboard.component.html',
  styleUrls: ['./scatter-dashboard.component.css']
})
export class ScatterDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Position Monitoring', cols: 2, rows: 2, chart: true },
          { title: 'Table Positions', cols: 2, rows: 2, table: true },
          { title: 'Position Configurations', cols: 2, rows: 1, config: true },
        ];
      }

      return [
        { title: 'Position Monitoring', cols: 2, rows: 2, chart: true },
        { title: 'Position Configurations', cols: 1, rows: 1, config: true },
        { title: 'Table Positions', cols: 1, rows: 2, table: true },
      ];
    })
  );

  esps: EspInfo[] = []
  devices: Device[] = []

  constructor(private breakpointObserver: BreakpointObserver, private scatterService: ScatterService) { }

  ngOnInit() {
    this.scatterService.getEsps().subscribe((esps: EspInfo[]) => {
      //console.log(esps)
      this.esps = []
      this.esps = esps
    });
  }

  public getDates(dates: Dates){
    console.log('submit dates from child ', dates)
    this.scatterService.getActiveDevices(dates).subscribe((devices: Device[]) => {
      this.devices = []
      this.devices = devices
      console.log(devices)
    })
  }
}
