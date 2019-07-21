import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Orders} from './orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders = 'restaurant/orders';

  constructor(private http: HttpClient) {
  }


  createOrder (order: Orders): Observable<Orders> {
    const url = this.orders + '/';
    console.log(url + '- post order');
    return this.http.post<Orders>(url, order);
  }
}
