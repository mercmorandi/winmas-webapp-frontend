import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Observable, Subject } from 'rxjs';
import { lineStatVM } from '../models/line-stat-vm';
import { LineService } from '../line.service';
import { MessageService } from '../message.service';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges, OnDestroy {
  @Input() stats$: Observable<lineStatVM[]>;
  private readonly onDestroy = new Subject<void>();
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Number of Devices', yAxisID: 'y-axis-0' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    // scales: {
    //   // We use this empty structure as a placeholder for dynamic theming.
    //   xAxes: [{}],
    //   yAxes: [
    //     {
    //       id: 'y-axis-0',
    //       position: 'right',
    //       gridLines: {
    //         color: 'rgba(255,0,0,0.3)',
    //       },
    //       ticks: {
    //         fontColor: 'red',
    //       }
    //     }
    //   ]
    //},
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
    annotation: {
    }
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private messageService: MessageService) { }

  ngOnChanges() {
    console.log("OnChange Chart");
    this.stats$.pipe(takeUntil(this.onDestroy))
               .subscribe(( stats: lineStatVM[] ) => {
                  console.log(stats, " - SUBSCRIBED");
                  this.pushOne(stats);
                });
  }

  ngOnDestroy() {
    console.log("DESTROY ", this.onDestroy);
    this.onDestroy.next();
  }

  public pushOne(stats: lineStatVM[]) {
    let data_labels: Label[] = this.lineChartLabels as Label[];

    this.lineChartData.forEach((x, i) => {
      console.log(x, i);
      let data_values: number[] = x.data as number[];
      stats.forEach((value:lineStatVM)=>{
        //console.log(value);
        data_values.push(value.nDevices);
        data_labels.push(value.minute.toString());
      });
      //x.data = data_values;
      console.log(x.data);
    });
    this.lineChartLabels.push();
  }

  // public pushOne() {
  //   let data_labels: Label[] = this.lineChartLabels as Label[];

  //   this.lineChartData.forEach((x, i) => {
  //     console.log(x, i);
  //     let data_values: number[] = x.data as number[];
  //     this.stats.forEach((value:lineStatVM)=>{
  //       //console.log(value);
  //       data_values.push(value.nDevices);
  //       data_labels.push(value.minute.toString());
  //     });
  //     //x.data = data_values;
  //     console.log(x.data);
  //   });
  //   this.lineChartLabels.push();
  // }



  public randomize(): void {
    // for (let i = 0; i < this.lineChartData.length; i++) {
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     this.lineChartData[i].data[j] = this.generateNumber(i);
    //   }
    // }
    // this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }

}

