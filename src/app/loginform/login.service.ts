import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginPath = '/restaurant/login';
  private refreshPath = '/restaurant/refresh';
  myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  public AUTH_TOKEN: string;
  public REFRESH_TOKEN: string;

  constructor(private http: HttpClient) {
  }

  login(loginAndPassword: LoginPassword): Observable<Tokens> {
    return this.http.post<Tokens>(this.loginPath, JSON.stringify(loginAndPassword), {headers: this.myHeaders});
  }

  refresh(): Observable<Tokens> {
    const refreshHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.REFRESH_TOKEN);
    return this.http.post<Tokens>(this.refreshPath, null, {headers: refreshHeader});
  }
}

export interface LoginPassword {
  login: string;
  password: string;
}

export interface Tokens {
  authToken: string;
  refreshToken: string;
}
