import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-line-dashboard',
  templateUrl: './line-dashboard.component.html',
  styleUrls: ['./line-dashboard.component.css']
})
export class LineDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Long-Term Statistics', cols: 1, rows: 1, chart: true },
          { title: 'Table Statistics', cols: 1, rows: 1 },
          { title: 'Statistic Configurations', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Long-Term Statistics', cols: 2, rows: 2, chart: true },
        { title: 'Table Statistics', cols: 1, rows: 1 },
        { title: 'Statistic Configurations', cols: 1, rows: 2 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
