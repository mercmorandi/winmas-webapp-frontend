import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScatterService } from '../scatter.service';
import * as _ from "lodash";
import { EspInfo } from '../models/esp-info';
import { Device } from '../models/device';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent {


  @Input() set esps(esps: EspInfo[]) {
    console.log(esps)

    this.setEspChart(esps)
  }

  @Input() set devices(devices: Device[]) {
    console.log(devices)
    if (devices.length > 0) {
      this.setDevicesChart(devices)
    }
  }


  _devices: any = {}
  current_date: number 

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  // public scatterChartDataMocked: ChartDataSets[] = [
  //   {
  //     data: [
  //       { x: 0, y: 0 },
  //     ],
  //     label: 'Esp1',
  //     pointBackgroundColor: '#1E90FF',
  //     pointRadius: 10,
  //   },
  //   {
  //     data: [
  //       { x: 0, y: 1 },
  //     ],
  //     label: 'Esp2',
  //     pointBackgroundColor: '#1E90FF',
  //     pointRadius: 10,
  //   },

  // ];
  public scatterChartData: ChartDataSets[] = []
  public scatterChartType: ChartType = 'scatter';

  constructor() { }

  public setDevicesChart(devices: Device[]){
    this._devices = []
    this._devices = _.groupBy(devices,(device)=>{
      let date = new Date(device.insertion_date)
      return date.setSeconds(0)
    })
    _.forEach(this._devices,(value, key) =>{
      this._devices[key] = _.uniqBy(value, 'mac')
    })
    console.log(this._devices)
    let first_key = _.min(_.keys(this._devices))
    this.current_date = parseInt(first_key)

    this._devices[first_key].forEach((device: Device) => {
      let row: ChartDataSets = {};
      let point: any = { x: Number, y: Number };

      point["x"] = device.x;
      point["y"] = device.y;
      row.data = [point];
      row.label = device.mac;
      row.pointRadius = 5;
      //set others property of row
      row.backgroundColor = '#1E90FF'
      console.log(row)
      this.scatterChartData.push(row);
    })
  }
  
  public setEspChart(esps: EspInfo[]) {
    this.scatterChartData = []
    esps.forEach((esp: EspInfo) => {
      let row: ChartDataSets = {};
      let point: any = { x: Number, y: Number };

      point["x"] = esp.x;
      point["y"] = esp.y;
      row.data = [point];
      row.label = esp.name;
      row.pointRadius = 10;
      //set others property of row
      console.log(row)
      this.scatterChartData.push(row);
    })
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
