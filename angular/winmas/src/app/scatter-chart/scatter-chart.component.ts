import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScatterService } from '../scatter.service';
import * as _ from "lodash";
import { EspInfo } from '../models/esp-info';


@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnInit {

  esps: EspInfo[] = []

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 0, y: 0 },
      ],
      label: 'Esp1',
      pointBackgroundColor: '#1E90FF',
      pointRadius: 10,
    },
    {
      data: [
        { x: 0, y: 1 },
      ],
      label: 'Esp2',
      pointBackgroundColor: '#1E90FF',
      pointRadius: 10,
    },

  ];
  public scatterChartType: ChartType = 'scatter';

  constructor(private scatterService: ScatterService) { }


  ngOnInit() {
    this.scatterService.getEsps().subscribe((esps: EspInfo[]) => {
      //console.log(esps)
      this.esps = esps
      this.setEspChart()
    });





  }

  public setEspChart() {
    this.scatterChartData = []
    this.esps.forEach((esp: EspInfo) => {
      console.log('dentrooo')
      let row: ChartDataSets = {};
      let point: any={x:Number,y:Number};
      
      point["x"] = esp.x;
      point["y"] = esp.y;
      row.data = [point];
      row.label = esp.name;
      row.pointRadius = 5;
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
