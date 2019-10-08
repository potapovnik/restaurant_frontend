import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Orders} from './orders';
import {SocketService} from "../cook-orders/socket.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders = 'restaurant/orders';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,private socket: SocketService) {
  }


  createOrder(order: {comments: string}): Observable<Orders> {
    const url = this.orders;
    console.log(url + '- post order');
    return this.http.post<Orders>(url, JSON.stringify(order), {headers: this.head});
  }

  updateOrder(order: Orders): Observable<Orders> {
    const url = this.orders;
    return this.http.put<Orders>(url, JSON.stringify(order), {headers: this.head});
  }

  getAll(): Observable<Orders[]> {
    const url = this.orders + '/getAll';
    console.log(url + '- get all order');
    return this.http.get<Orders[]>(url, {headers: this.head});
  }

  getAllById(id: number): Observable<Orders[]> {
    this.socket.onMessage('/restaurant/goodbay').pipe(map(post => alert(post)));
    const url = this.orders + '/allOrdersById/' + id;
    console.log(url + '- get  all order of user: ' + id);
    return this.http.get<Orders[]>(url, {headers: this.head});
  }
}
