import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { ProxyConfig } from '../models/proxy-config';
import { Observable, Subscription } from 'rxjs';
import { ProxyStatus } from '../models/proxy-status';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.css']
})
export class ProxyDashboardComponent implements OnInit, OnDestroy {

  cards = [
    { title: 'Proxy config', cols: 2, rows: 2, chart: true, visibility: true },
    { title: 'Proxy Status', cols: 1, rows: 1, config: true, visibility: true},
  ]

  messages = []
  current_status: ProxyStatus
  message_subscription: Subscription
  status_subscription: Subscription
  constructor(private proxyService: ProxyService) { }

  ngOnInit(): void {
    this.message_subscription = this.proxyService.getMessages().subscribe( message => {
      console.log("messaggio ricevuto: ", message)
      this.messages.push(message)

    })

    this.proxyService.getCurrentStatus().subscribe( (status:ProxyStatus) => {
      console.log("new status: ", status)
      this.current_status=status
    })
    this.proxyService.current_status$.subscribe(status => {
      this.current_status = status
    })
  }

  ngOnDestroy(): void{
    if (this.message_subscription){
      this.message_subscription.unsubscribe()
    }

    if (this.status_subscription){
      this.status_subscription.unsubscribe()
    }
    
  }

  public setProxyConf(proxyConf: ProxyConfig){
    console.log("ricevuto: ",proxyConf)

    this.proxyService.startProxy(proxyConf).subscribe( () =>{
      console.log("proxy acceso")
    })
  }

  public stopProxy(){
    console.log("stopping proxy")
    this.proxyService.stopProxy().subscribe(() => {
      console.log("proxy spento")
    })
  }

  public getMessages(){
    this.proxyService.getMessages().subscribe((message:string) => {
      console.log("message from socket: ",message)
    })
  }
}
