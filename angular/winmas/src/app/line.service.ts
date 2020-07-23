import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';
import { lineStatVM } from './models/line-stat-vm';
import { tap, map, switchMap } from 'rxjs/operators';
import { kMaxLength } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private jsonBody;


  constructor(private httpClient: HttpClient) { }

  //to do: test and finish
  getStats(date: Number): Observable<lineStatVM[]> {
    console.log("service: ", date);
    return this.httpClient.get(
      `${environment.apiUrl}stats?start_date=` + date, {
        responseType:"json",
      } ).pipe(
        tap(
          (data) => {
        console.log('get_stats', data);
      }),
      map((data:Object) => {
        console.log(data.toString());
        let a:lineStatVM[] =[];
        for(var k in data){
          console.log(k,data[k]);
          a.push({nDevices:data[k],minute:k});
        }
        return a;
      }))
  }

}
