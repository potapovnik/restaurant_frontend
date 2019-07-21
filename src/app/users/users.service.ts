import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from './users';
import {Role} from '../utils/role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = '/restaurant/users';
  private roles = '/restaurant/roles';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getUsersById(id: number): Observable<Users> {
    const url = this.users + '/' + id;
    console.log(url + '- get by id:' + id);
    return this.http.get<Users>(url);
  }

  getAllUsers(): Observable<Users[]> {
    const url = this.users + '/getAll';
    console.log(url + '- get all');
    return this.http.get<Users[]>(url);
  }

  deleteUserById(id: number): Observable<Boolean> {
    const url = this.users + '/' + id;
    console.log(url + '- delete');
    return this.http.delete<Boolean>(url);
  }

  update(user: Users): Observable<Users> {
    console.log(this.users + '- update');
    return this.http.put<Users>(this.users, JSON.stringify(user), {headers: this.head});
  }

  create(user: Users): Observable<Users> {
    console.log(this.users + '- create');
    return this.http.post<Users>(this.users, JSON.stringify(user), {headers: this.head});
  }

  getAllRole(): Observable<Role[]> {
    const url = this.roles + '/allUsers';
    console.log(url + '- get all');
    return this.http.get<Role[]>(url);
  }

  getAllCook(): Observable<Users[]> {
    const url = this.users + '/getAllCook';
    console.log(url + '- getAllCook');
    return this.http.get<Users[]>(url);
  }
}
