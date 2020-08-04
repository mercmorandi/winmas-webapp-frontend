import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScatterService } from '../scatter.service';
import * as _ from "lodash";
import { EspInfo } from '../models/esp-info';
import { Device, DevicePoint } from '../models/device';
import { Dates } from '../models/dates';
import { DeviceDates } from '../models/device-dates';

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

  //@Input() set devices(devices: Device[]) {
  //  console.log(devices)
  //  if (devices.length > 0) {
  //    this.setDevicesChart(devices)
  //  }
  //}

  @Input() set devicesDates(devicesDates: DeviceDates) {
    if (devicesDates) {
      this.start_date = devicesDates.start_date
      this.end_date = devicesDates.end_date
      this.current_date = this.start_date
      this.setDevicesChart(devicesDates.devices)
    }
  }


  _esps: EspInfo[] = []
  devices_points: any = {}
  distinct_dates: number[] = []
  current_date: number
  start_date: number
  end_date: number

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: -15,
          suggestedMax: 15,
          stepSize: 0.5
        }
      }],
      xAxes: [{
        ticks: {
          suggestedMin: -15,
          suggestedMax: 15,
          stepSize: 0.5
        }
      }]
    },
    legend: {
      position: 'bottom',
      fullWidth: true,
    },

  };

  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public scatterChartData: ChartDataSets[] = []
  public scatterChartType: ChartType = 'scatter';

  constructor() { }

  public setDevicesChart(devices: Device[]) {
    this.distinct_dates = []
    let tmp_date = this.start_date
    while (tmp_date <= this.end_date) {
      this.distinct_dates.push(tmp_date)
      tmp_date = tmp_date + 60
    }
    console.log("distinct dates ", this.distinct_dates)
    //gruppo per mac
    this.devices_points = _.groupBy(devices, (device) => {
      return device.mac
    })

    //una probe per mac al minuto
    _.forEach(this.devices_points, (value, key) => {
      let color = this.generateRandomColor()
      this.devices_points[key] = (value.map(device => {
        let date = new Date(device.insertion_date)
        device.insertion_date = date.setSeconds(0)
        //mappare su DevicePoint

        return new DevicePoint(device, color)
      }))
    })
    _.forEach(this.devices_points, (value, key) => {
      this.devices_points[key] = _.uniqBy(value, 'device.insertion_date')
    })



    let devices_point_list: DevicePoint[] = []
    for (let k in this.devices_points) {
      devices_point_list.push(this.devices_points[k])
    }
    devices_point_list = _.flatten(devices_point_list)


    ////gruppo per timestamp
    this.devices_points = _.groupBy(devices_point_list, (devicePoint) => {
      return Math.floor(parseInt(devicePoint.device.insertion_date) / 1000)
    })

    console.log('-------------')
    console.log(this.devices_points)
    console.log('-------------')

    _.forEach(this.devices_points, (value,key) =>{
      console.log(new Date(parseInt(key)*1000))
    } )

    this.drawData()


  }

  public drawData() {
    this.scatterChartData = []
    this.addEspChart()

    if (_.has(this.devices_points, this.current_date)) {
      this.devices_points[this.current_date.toString()].forEach((devicePoint: DevicePoint) => {
        this.scatterChartData.push(devicePoint.point);
      })
    }

  }

  public generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
  }

  public setEspChart(esps: EspInfo[]) {
    this.scatterChartData = []
    this._esps = []
    esps.forEach((esp: EspInfo) => {
      this._esps.push(esp)
      this.scatterChartData.push(this.drawEsps(esp));
    })

  }
  public addEspChart() {
    this._esps.forEach((esp: EspInfo) => {
      this.scatterChartData.push(this.drawEsps(esp));
    })
  }

  public drawEsps(esp: EspInfo) {
    let row: ChartDataSets = {};
    let point: any = { x: Number, y: Number };

    point["x"] = esp.x;
    point["y"] = esp.y;
    row.data = [point];
    row.label = esp.name;
    row.pointRadius = 5;
    //set others property of row
    row.pointBackgroundColor = '#F0F8FF'
    row.backgroundColor = '#F0F8FF'
    return row
  }



  public goForward() {
    console.log('go_forward')
    var current_index = this.distinct_dates.indexOf(this.current_date);
    current_index++
    this.current_date = this.distinct_dates[current_index]
    this.drawData()


  }

  public goBackward() {
    console.log('go_backward')
    var current_index = this.distinct_dates.indexOf(this.current_date);
    current_index--
    this.current_date = this.distinct_dates[current_index]
    this.drawData()

  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
