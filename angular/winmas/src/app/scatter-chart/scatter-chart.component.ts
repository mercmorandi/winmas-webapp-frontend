import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { ScatterService } from '../scatter.service';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnInit {

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
ChartDataSets
  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 0, y: 0 },
      ],
      label: 'Esps1',

      pointRadius: 10,
    }
  ];
  public scatterChartType: ChartType = 'scatter';

  constructor(private scatterService: ScatterService) { }


  ngOnInit() {
    this.scatterService.getEsps().subscribe((data: Map<string, Map<string, number>>) => {
      console.log("DATAAA: ", data);
      this.ChartDataSets = [];
      data.forEach((pos, esp_name) => {
        console.log(pos, esp_name);

        let row: ChartDataSets;
        let point: ChartPoint;
        point.x = pos["X"];
        point.y = pos["Y"];
        row.data = [point];
        row.label = esp_name;
        row.pointRadius = 1;
        //set others property of row
        this.scatterChartData.push(row);
      })
      console.log(this.ChartDataSets);
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
