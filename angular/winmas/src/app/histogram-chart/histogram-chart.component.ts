import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScatterService } from '../scatter.service';
import * as _ from "lodash";
import { EspInfo } from '../models/esp-info';
import { Device, DevicePoint, DeviceBar } from '../models/device';
import { Dates } from '../models/dates';
import { DeviceDates } from '../models/device-dates';

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.css']
})
export class HistogramChartComponent{

  @Input() set devicesDates(devicesDates: DeviceDates) {
    if (devicesDates) {
      this.start_date = devicesDates.start_date
      this.end_date = devicesDates.end_date
      this.current_date = this.start_date
      this.setDevicesChart(devicesDates.devices)
    }
  }

  @Output() devicesTable: EventEmitter<Device[]> = new EventEmitter<Device[]>()

  devices_points: any = {}
  distinct_dates: number[] = []
  current_date: number
  start_date: number
  end_date: number

  public barChartOptions: ChartOptions = {
    tooltips: {
      callbacks: {
          label: function(tooltipItem, data) {
              var row = data.datasets[tooltipItem.datasetIndex]
              var label = []
              label.push('name: '+row.label || '' );
              console.log('tooltip: ',tooltipItem)
              label.push('MACs: '+tooltipItem.xLabel)
              label.push('Occurrences: '+tooltipItem.yLabel)
              var test = []
              test.push(label)
              return test;
          },
      }
  },
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 2
        }
      }],
      xAxes: [{
        ticks: {
          stepSize: 2
        }
      }]
    },
    legend: {
      position: 'bottom',
      fullWidth: true,
    },

  };

  public barChartLabels: Label[] = []
  public barChartData: ChartDataSets[] = []
  public barChartType: ChartType = 'bar';

  constructor() { }

  public setDevicesChart(devices: Device[]) {
    this.distinct_dates = []
    let tmp_date = this.start_date

    this.devices_points = _.groupBy(devices, (device) => {
      return device.mac
    })

    //una location per mac al minuto
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
    console.log(this.devices_points)
    for (let k in this.devices_points) {
      //let frequency = (this.devices_points[k]).length
      //console.log("freauqenza: ",frequency)
      //console.log('sono qua')
      //console.log(this.devices_points[k]?.length)
      this.barChartLabels.push(k)
      //this.barChartData.push(frequency)
      devices_point_list.push(this.devices_points[k])
    }
    devices_point_list = _.flatten(devices_point_list)


    ////gruppo per timestamp
    this.devices_points = _.groupBy(devices_point_list, (devicePoint) => {
      return Math.floor(parseInt(devicePoint.device.insertion_date) / 1000)
    })

    _.forEach(this.devices_points, (value, key) => {
      console.log(new Date(parseInt(key) * 1000))
    })

    //this.drawData()


  }

  public drawData() {
    let devicesTable: Device[] = []

    if (_.has(this.devices_points, this.current_date)) {
      this.devices_points[this.current_date.toString()].forEach((devicePoint: DevicePoint) => {
        this.barChartData.push(devicePoint.point);
        devicesTable.push(devicePoint.device)
      })
    }

    this.devicesTable.emit(devicesTable)

  }

  public generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
