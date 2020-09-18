import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ProxyStatus } from './models/proxy-status';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  private socket
  private _current_status = new BehaviorSubject<ProxyStatus>(new ProxyStatus("unknown"));
  current_status$ = this._current_status.asObservable();
  private _locations = new BehaviorSubject<Location[]>(new Array<Location>())
  locations$ = this._locations.asObservable();

  constructor(private httpClient: HttpClient) {
    this.socket = io('http://localhost:5000');
  }

  public startProxy() {
   
    return this.httpClient
      .get<string>(`${environment.apiUrl}start_proxy/`
      )
      .pipe(
        //tap((data)=>console.log(data)),),
        catchError(err => throwError('client error'))
      )
  }

  public stopProxy() {
    console.log("into stop proxy")
    return this.httpClient.get(`${environment.apiUrl}stop_proxy/`)
      .pipe(
        //tap((data)=>console.log(data)),),
        catchError(err => throwError('client error'))
      )
  }
  public startProxyAndListen(proxyConf) {
    let params = new HttpParams();
    params = params.append('host', proxyConf.host);
    params = params.append('port', proxyConf.port);
    this.httpClient
      .get(`${environment.apiUrl}start_proxy`,
        { params: params }
      ).subscribe(this.getStatues().subscribe(status => {
        console.log("new_status ", status)
        //this._current_status.next(status)
      }))
  }

  public sendProxyConf(proxyConf) {
    this.socket.emit("start_proxy", proxyConf);
  }

  public getCurrentStatus(): Observable<ProxyStatus> {
    return this.httpClient
      .get<ProxyStatus>(`${environment.apiUrl}current_proxy_status`)
      .pipe(
        tap((data) => console.log(data)),
        catchError(err => throwError('client error'))
      )
  }

  addLocationToList(location:Location) {
    // apply the current value of your books Subject to a local variable
    let loc_list = this._locations.getValue();
    // push that book into your copy's array
    loc_list.push(location);
    // apply the local updated array value as your new array of books Subject
    this._locations.next(loc_list);
  }

  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on("new-message", message => {
        console.log("message from server")
        observer.next(message);
      });
    });
  };

  public getLocations = () => {
    return Observable.create(observer => {
      this.socket.on("new-location", (location: Location) => {
        console.log("location from server: ",location )
        this.addLocationToList(location)
        //observer.next(location);
      });
    });
  };
  public getStatues = () => {
    return Observable.create(observer => {
      this.socket.on("proxy_status", status => {
        console.log("status from socket io ", status)
        this._current_status.next(new ProxyStatus(status))
        //observer.next(status);
      });
    });
  };
}
