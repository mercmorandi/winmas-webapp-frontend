import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint, ChartElementsOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScatterService } from '../scatter.service';
import * as _ from "lodash";
import { EspInfo } from '../models/esp-info';
import { Device, DevicePoint, DeviceBar } from '../models/device';
import { Dates } from '../models/dates';
import { DeviceDates } from '../models/device-dates';
import { element } from 'protractor';

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.css']
})
export class HistogramChartComponent{

  deviceList: Device[] = []

  currentId: number;
  @Output() deviceDetail: EventEmitter<number> = new EventEmitter<number>()

  @Input() set devicesDates(devicesDates: DeviceDates) {
    if (devicesDates) {
      this.start_date = devicesDates.start_date
      this.end_date = devicesDates.end_date
      this.current_date = this.start_date
      this.deviceList = devicesDates.devices
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
              var label = []
              //label.push('name: '+row.label || '' );
              //console.log('tooltip: ',tooltipItem)
              //label.push('MACs: '+tooltipItem.xLabel)
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
          stepSize: 2,
          fontColor: '#FFF'
        }
      }],
      xAxes: [{
        ticks: {
          stepSize: 2,
          fontColor: '#FFF'
        }
      }]
    },
    legend: {
      position: 'bottom',
      fullWidth: true,
      display: false
    },

  };

  public barChartLabels: Label[] = []
  public barChartData: ChartDataSets[] = [{
    data: []
  }]
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
    for (let k in this.devices_points) {
      let frequency = (this.devices_points[k]).length
      this.barChartData[0].data.push(frequency)
      this.barChartLabels.push(k)
      
      devices_point_list.push(this.devices_points[k])
    }
    this.sortData()
    devices_point_list = _.flatten(devices_point_list)

    ////gruppo per timestamp
    this.devices_points = _.groupBy(devices_point_list, (devicePoint) => {
      return Math.floor(parseInt(devicePoint.device.insertion_date) / 1000)
    })

  }

  public sortData(){
    var dataArray = [];
    this.barChartData[0].data.forEach(element => {
      dataArray.push(element);
    });
    
    // Get the index after sorted.
    let dataIndexes = dataArray.map((d, i) => i);
    dataIndexes.sort((a, b) => {
      return dataArray[b] - dataArray[a];
    });
    // create after sorted datasets.
    var tempDatasets = [];
    var tempLabels = [];
    dataIndexes.forEach(element => {
      tempDatasets.push(this.barChartData[0].data[element]);
      tempLabels.push(this.barChartLabels[element]);
    });
    // apply it
    this.barChartLabels = tempLabels;
    this.barChartData[0].data = tempDatasets;
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
  public chartClicked({ event, active }: { event: MouseEvent, active: ChartElementsOptions }): void {
    console.log(active);
    var index = active[0]._index;
    var mac = this.barChartLabels[index]
    console.log(this.deviceList)

    var device = this.deviceList.filter(value => value.mac == mac)
    this.goDetails(device[0].device_id)
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  goDetails(id:number){
    this.currentId = id
    this.deviceDetail.emit(id)
  }

}
