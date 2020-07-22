import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';
import { lineStatVM } from './models/line-stat-vm';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private jsonBody;

  lineStats$: Observable<lineStatVM[]>;

  constructor(private httpClient: HttpClient) { }

  //to do: test and finish
  getStats(date: Number): Observable<lineStatVM[]> {
    const params = new HttpParams()
      .set('start_date', date.toString());
    this.lineStats$ = this.httpClient.get<lineStatVM[]>(
      `${environment.apiUrl}/get_stats`, {
        responseType:"json",
        params
      } ).pipe(tap((data) => {
        console.log('get_stats', data);
      }));
    return this.lineStats$;
  }

  getLineStats(): Observable<lineStatVM[]> {
    return this.lineStats$; //.subscribe();
  }
}
