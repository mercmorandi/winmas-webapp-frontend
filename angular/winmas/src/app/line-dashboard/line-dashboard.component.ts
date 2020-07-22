import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

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
export class LineDashboardComponent {
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

  constructor(private breakpointObserver: BreakpointObserver) {}

  public visualize(choise: Content): void {

  }
}
