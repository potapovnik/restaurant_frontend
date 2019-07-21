import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Orders} from '../utils/orders';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {
  private waiter = 'restaurant/waiterOrders';

  constructor(private http: HttpClient) {
  }

  allOrdersOfWaiter(id: number): Observable<Orders[]> {
    const url = this.waiter + '/allOrdersById' + id;
    console.log(url + '- get all orders of cook  id:' + id);
    return this.http.get<Orders[]>(url);
  }

}
