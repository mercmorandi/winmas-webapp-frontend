import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EspInfo } from '../models/esp-info';
import { ScatterService } from '../scatter.service';
import { Dates } from '../models/dates';
import { Device } from '../models/device';
import { DeviceDates } from '../models/device-dates';

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
          { title: 'Device Details', cols: 2, rows: 2, details: false },
        ];
      }

      return [
        { title: 'Position Monitoring', cols: 2, rows: 2, chart: true, visibility: true },
        { title: 'Position Configurations', cols: 1, rows: 1, config: true, visibility: true},
        { title: 'Table Positions', cols: 1, rows: 2, table: true, visibility: false },
        { title: 'Device Details', cols: 2, rows: 2, details: false, visibility: false },
      ];
    })
  );

  esps: EspInfo[] = []
  devicesDates: DeviceDates
  devices: Device[] = []
  cards2 = [
    { title: 'Position Monitoring', cols: 2, rows: 2, chart: true, visibility: true },
    { title: 'Position Configurations', cols: 1, rows: 1, config: true, visibility: true},
    { title: 'Table Positions', cols: 1, rows: 2, table: true, visibility: false },
    { title: 'Device Details', cols: 2, rows: 2, details: true, visibility: false },
  ]
  deviceIdDetails: number

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
    this.scatterService.getActiveDevices(dates).subscribe((devicesDates: DeviceDates) => {
      this.devicesDates = devicesDates
      console.log(devicesDates)
    })
    this.cards2[2].visibility = true
  }

  public getDevicesTable(devices: Device[]){
    console.log('submit devices from child ', devices)
    this.devices = devices
    
  }

  public getDeviceDetails(id:number){
    console.log(id)
    this.deviceIdDetails = id
    this.cards2[3].visibility = true
  }
}
