import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LineService } from '../line.service';
import { Observable, of } from 'rxjs';
import { lineStatVM } from '../models/line-stat-vm';

enum Content {
  chart,
  config,
  table,
}

@Component({
  selector: 'app-line-dashboard',
  templateUrl: './line-dashboard.component.html',
  styleUrls: ['./line-dashboard.component.css']
})
export class LineDashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Long-Term Statistics', cols: 2, rows: 2, chart: true },
          { title: 'Statistics Configurations', cols: 2, rows: 2, config: true },
          { title: 'Table Statistics', cols: 2, rows: 2, table: true },
        ];
      }

      return [
        { title: 'Long-Term Statistics', cols: 2, rows: 2, chart: true },
        { title: 'Statistics Configurations', cols: 1, rows: 1, config: true },
        { title: 'Table Statistics', cols: 1, rows: 2, table: true },
      ];
    })
  );

  lineStats$: Observable<lineStatVM[]> = of([]);
  // @Output() chartUpdate = new EventEmitter<number>();

  // date: number;

  constructor(private breakpointObserver: BreakpointObserver, private lineService: LineService) {}

  ngOnInit() {
    // initialize page
    this.lineStats$ = this.lineService.getStats(1593624720); //default date mercoledì 1 luglio 2020 19:32:00 GMT+02:00 DST
  }

  public setDate(date :number) {
    // this.date = date;
    console.log("set date dashboard", date);

    this.lineStats$ = this.lineService.getStats(date);
    // .pipe(
    //   tap((data: lineStatVM[])=>console.log("dashboard received: ",data))
    // );
    // this.chartUpdate.emit(date);
  }
}
