import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Winmas:";
  subtitle = ""
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private status = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        let new_subtitle = data.url.replace(/\W/g, ' ')
        console.log("new_subtitle: ", new_subtitle)
        this.subtitle = new_subtitle.split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');

      }

    })
  }

  public start() {
    this.status = true;
    //add request to start
  }

  public stop() {
    this.status = false;
    //add request to stop
  }

}
