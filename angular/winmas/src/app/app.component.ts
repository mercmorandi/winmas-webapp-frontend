import { Component, OnInit } from '@angular/core';
import { ProxyService } from './proxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.proxyService.getStatues().subscribe(() => {
      console.log("subscribed to status socket")
    })
    this.proxyService.getLocations().subscribe(() => {
      console.log("subscribed to locations socket")
    })
  }
  

  
  constructor(private proxyService: ProxyService) { }

}
