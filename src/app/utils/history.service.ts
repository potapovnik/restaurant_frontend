import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Orders} from '../utils/orders';
import {History} from './History';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history = 'restaurant/history';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }


  nextStatus(history: History): Observable<History> {
    const url = this.history;
    console.log(url + '- next status of order');
    return this.http.post<History>(url, JSON.stringify(history), {headers: this.head});

  }


}
