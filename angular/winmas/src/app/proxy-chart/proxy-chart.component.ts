import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EspInfo } from '../models/esp-info';
import { Location } from '../models/location';

@Component({
  selector: 'app-proxy-chart',
  templateUrl: './proxy-chart.component.html',
  styleUrls: ['./proxy-chart.component.css']
})
export class ProxyChartComponent implements OnInit {

  @Input() set esps(esps: EspInfo[]) {
    console.log("esps set ",esps)

    this.setEspChart(esps)
  }

  @Input() set location(location:Location){
    console.log("input set ",this._esps)
    if (location){
      this.drawData(location)
    }
    
  }
  _esps: EspInfo[] = []

  public scatterChartOptions: ChartOptions = {
    tooltips: {
      callbacks: {
          label: function(tooltipItem, data) {
              var row = data.datasets[tooltipItem.datasetIndex]
              var label = []
              label.push('name: '+row.label || '' );
              console.log('tooltip: ',tooltipItem)
              label.push('x: '+tooltipItem.xLabel)
              label.push('y: '+tooltipItem.yLabel)
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
          suggestedMin: -15,
          suggestedMax: 15,
          stepSize: 0.5,
          fontColor: '#FFF',
        }
      }],
      xAxes: [{
        ticks: {
          suggestedMin: -15,
          suggestedMax: 15,
          stepSize: 0.5,
          fontColor: '#FFF'
        }
      }]
    },
    legend: {
      display: false,
      position: 'bottom',
      fullWidth: true,
    },

  };

  public scatterChartLabels: Label[] = [];
  public scatterChartData: ChartDataSets[] = []
  public scatterChartType: ChartType = 'scatter';

  constructor() { }

  ngOnInit(): void {
  }

  drawData(location: Location) {
    this.scatterChartData = []
    let row: ChartDataSets = {};
    let point: any = { x: Number, y: Number };

    point["x"] = location.x;
    point["y"] = location.y;
    row.data = [point];
    row.label = location.mac;
    row.pointRadius = 5;
    row.pointBackgroundColor = '#99ff66'
    row.backgroundColor = '#99ff66'
    this.scatterChartData.push(row)
    this.addEspChart()


  }

  public addEspChart() {
    this._esps.forEach((esp: EspInfo) => {
      this.scatterChartData.push(this.drawEsps(esp));
    })
  }

  public setEspChart(esps: EspInfo[]) {
    console.log("set esps chart", esps)
    this.scatterChartData = []
    this._esps = []
    esps.forEach((esp: EspInfo) => {
      this._esps.push(esp)
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
    row.pointBackgroundColor = '#ff6600'
    row.backgroundColor = '#ff6600'
    return row
  }

}
