import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';
import { lineStatVM } from './models/line-stat-vm';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private httpClient: HttpClient) { }

  get_stats(): Observable<lineStatVM[]> {
    return this.httpClient.get<lineStatVM[]>(`${environment.apiUrl}/get_stats`)
      .pipe(tap((data) => {
      console.log('get_stats', data);
    }));
  }
}
