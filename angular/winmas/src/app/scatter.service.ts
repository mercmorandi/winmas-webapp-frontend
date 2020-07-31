import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map, shareReplay, catchError } from 'rxjs/operators';
import { EspInfo } from '../app/models/esp-info'

@Injectable({
  providedIn: 'root'
})
export class ScatterService {

  constructor(private httpClient: HttpClient) { }

  getEsps(): Observable<EspInfo[]>{
    return this.httpClient
      .get<EspInfo[]>(`${environment.apiUrl}get_esps_new`)
      .pipe(
        //tap((data)=>console.log(data)),
        catchError(err => throwError('client error'))
      )
      
  }

}
