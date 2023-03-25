import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly serverUrl = 'https://localhost:8000/';
  readonly authentication_token = 'authentication_token';
  readonly httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<object> {
    return lastValueFrom(
      this.http.post(
        this.serverUrl + this.authentication_token,
        {
          email,
          password,
        },
        this.httpOptions
      )
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.serverUrl + 'signout', {}, this.httpOptions);
  }
}
