import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScatterService {

  constructor(private httpClient: HttpClient) { }

  //to do: test and finish
  getEsps(): Observable<Map<String, Map<String, Number>>> {
    // console.log("service: ", date);
    return this.httpClient.get(
      `${environment.apiUrl}get_esps`, {
        responseType:"json",
      } ).pipe(
        tap(
          (data) => {
        console.log('get_esps', data);
      }),
      map((data:Object) => {
        // console.log(data.toString());
        let a:Map<String, Map<String, Number>> = new Map<String, Map<String, Number>>();
        for(var k in data){
          //console.log(k,data[k]);
          a[k] = data[k];
        }
        return a;
      }),
      shareReplay(1))
  }
}
