import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EspInfo } from '../models/esp-info';
import { ScatterService } from '../scatter.service';
import { Dates } from '../models/dates';
import { Device, DeviceTable } from '../models/device';
import { DeviceDates } from '../models/device-dates';
import { DeviceInfo } from '../models/device-info';

@Component({
  selector: 'app-scatter-dashboard',
  templateUrl: './scatter-dashboard.component.html',
  styleUrls: ['./scatter-dashboard.component.css']
})
export class ScatterDashboardComponent implements OnInit {

  esps: EspInfo[] = []
  devicesDates: DeviceDates
  devices: DeviceTable[] = []
  cards2 = [
    //{ title: 'Position Configurations', cols: 4, rows: 1, config: true, visibility: true},
    { title: 'Position Monitoring', cols: 3, rows: 2, chart: true, visibility: true },
    { title: 'Table Positions', cols: 1, rows: 2, table: true, visibility: false },
    { title: 'Device Details', cols: 4, rows: 2, details: true, visibility: false },
  ]
  deviceIdDetails: number
  deviceInfo: DeviceInfo = new DeviceInfo()

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
    this.deviceInfo = new DeviceInfo()
    this.cards2[1].visibility = true
    this.cards2[2].visibility = false
  }

  public getDevicesTable(devices: DeviceTable[]){
    console.log('submit devices from child ', devices)
    this.devices = devices
    
  }

  public getDeviceDetails(id:number){
    this.deviceIdDetails = id
    this.scatterService.getDeviceInfo(id).subscribe((data: DeviceInfo) => {
      this.deviceInfo = data
      console.log("device info: ", this.deviceInfo)
    })
    this.cards2[2].visibility = true
  }
}
