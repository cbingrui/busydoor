import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {

  domain = environment.backendApiUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  register(user): Observable<any> {
    return this.http.post(this.domain + '/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post(this.domain + '/api/login', JSON.stringify(credentials), this.options);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.domain + '/api/users');
  }

  countUsers(): Observable<any> {
    return this.http.get(this.domain + '/api/users/count');
  }

  addUser(user): Observable<any> {
    return this.http.post(this.domain + '/api/user', JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
    return this.http.get(this.domain + `/api/user/${user._id}`);
  }

  editUser(user): Observable<any> {
    return this.http.put(this.domain + `/api/user/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(this.domain + `/api/user/${user._id}`, this.options);
  }

  post(url, body): Observable<any> {
    return this.http.post(this.domain + url, JSON.stringify(body), this.options);
  }

  get(url): Observable<any> {
    return this.http.get(this.domain + url);

  }
}
