import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { ProxyConfig } from '../models/proxy-config';
import { Observable, Subscription } from 'rxjs';
import { ProxyStatus } from '../models/proxy-status';
import { EspInfo } from '../models/esp-info';
import { ScatterService } from '../scatter.service';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.css']
})
export class ProxyDashboardComponent implements OnInit, OnDestroy {

  cards = [
    { title: 'Proxy Logger', cols: 3, rows: 2, logger: true, visibility: true},
    { title: 'Proxy Chart', cols: 3, rows: 2, chart: true, visibility: true},
  ]

  messages = []
  esps: EspInfo[] = []
  locations: Location[] = []
  locationChart: Location
  new_locations: Location[] = []
  current_status: ProxyStatus
  location_subscription: Subscription
  status_subscription: Subscription
  constructor(private proxyService: ProxyService, private scatterService: ScatterService) { }

  ngOnInit(): void {

    this.proxyService.getCurrentStatus().subscribe( (status:ProxyStatus) => {
      console.log("new status: ", status)
      this.current_status=status
      if (status.status == "on"){
        //this.cards[0].visibility=true
        //this.cards[1].visibility=true
      }else{
        //this.cards[0].visibility=false
        //this.cards[1].visibility=false
      }
    })

    this.location_subscription = this.proxyService.locations$.subscribe(locations => {
      this.new_locations = Array.from(locations)
    })

    this.status_subscription = this.proxyService.current_status$.subscribe(status => {
      this.current_status = status
    })

    this.scatterService.getEsps().subscribe((esps: EspInfo[]) => {
      console.log("esp service: ",esps)
      this.esps = []
      this.esps = esps
    });
  }

  ngOnDestroy(): void{

    if (this.status_subscription){
      this.status_subscription.unsubscribe()
    }

    if (this.location_subscription){
      this.location_subscription.unsubscribe()
    }
    
  }

  public setProxyConf(){
    
    this.proxyService.startProxy().subscribe( () =>{
      console.log("proxy acceso")
      //this.cards[0].visibility = true
      //this.cards[1].visibility = true
    })
  }

  public stopProxy(){
    console.log("stopping proxy")
    //this.cards[0].visibility = false
    //this.cards[1].visibility = false
    this.proxyService.stopProxy().subscribe(() => {
      console.log("proxy spento")
      
    })
  }

  public getLocationDetail(location:Location){
    console.log("location dhasboard ", location)
    this.locationChart = location
  }
}
