import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  title = "Winmas : Wi-Fi Is Not Mary's Son";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private status = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  public start() {
    this.status = true;
    //add request to start
  }

  public stop() {
    this.status = false;
    //add request to stop
  }

}
