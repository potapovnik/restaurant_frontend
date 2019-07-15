import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Users} from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = '/restaurant/users';
  private url: string;
  private idEvent: number;

  constructor(private http: HttpClient) {
  }

  getUsersById(id: number): Observable<Users> {
    const url = this.users + '/' + id;
    return this.http.get<Users>(url);
  }
}
