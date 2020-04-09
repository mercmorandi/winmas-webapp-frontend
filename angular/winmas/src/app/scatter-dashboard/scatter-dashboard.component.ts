import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-scatter-dashboard',
  templateUrl: './scatter-dashboard.component.html',
  styleUrls: ['./scatter-dashboard.component.css']
})
export class ScatterDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Position Monitoring', cols: 1, rows: 1, chart: true },
          { title: 'Position Configurations', cols: 1, rows: 1, config: true },
          { title: 'List Positions', cols: 1, rows: 1, list: true },
        ];
      }

      return [
        { title: 'Position Monitoring', cols: 2, rows: 2, chart: true },
        { title: 'Position Configurations', cols: 1, rows: 1, config: true },
        { title: 'List Positions', cols: 1, rows: 2, list: true },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
