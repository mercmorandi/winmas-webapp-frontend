import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map, shareReplay, catchError } from 'rxjs/operators';
import { EspInfo } from '../app/models/esp-info'
import { Device } from '../app/models/device'
import { Dates } from './models/dates';

@Injectable({
  providedIn: 'root'
})
export class ScatterService {

  constructor(private httpClient: HttpClient) { }

  getEsps(): Observable<EspInfo[]>{
    return this.httpClient
      .get<EspInfo[]>(`${environment.apiUrl}get_esps`)
      .pipe(
        //tap((data)=>console.log(data)),
        catchError(err => throwError('client error'))
      )
      
  }

  getActiveDevices(dates: Dates):Observable<Device[]>{
    let params = new HttpParams();
    params = params.append('start_date', dates.start_date.toString());
    params = params.append('end_date', dates.end_date.toString());
    return this.httpClient
      .get<Device[]>(`${environment.apiUrl}activeLocation`,
      {params: params} 
      )
      .pipe(
        tap((data)=>console.log(data)),
        catchError(err => throwError('client error'))
      )
  }

}
