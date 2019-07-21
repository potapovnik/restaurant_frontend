import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Orders} from '../utils/orders';
import {CookOrders} from './cook.orders';


@Injectable({
  providedIn: 'root'
})
export class CookService {
  private cook = 'restaurant/cookOrders';

  constructor(private http: HttpClient) {
  }

  allOrdersOfCook(id: number): Observable<CookOrders[]> {
    const url = this.cook + '/getAllByIdUser/' + id;
    console.log(url + '- get all orders of cook  id:' + id);
    return this.http.get<CookOrders[]>(url);
  }

  updateOrder(cookOrder: CookOrders): Observable<CookOrders[]> {
    const url = this.cook + '/';
    console.log(url + '- put waiterOrder');
    return this.http.put<CookOrders[]>(url, cookOrder);
  }
}
