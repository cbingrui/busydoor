import { JwtService } from './../jwt.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/distinctUntilChanged';
@Injectable()
export class UserService {
  domain = environment.backendApiUrl;

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  // BehaviorSubject
  // listen the last user being eliminated and all the later subsequent user before 'OnCompleted'
  private currentUserSubject = new BehaviorSubject<ResponseBody.User>(null);
  public $currentUser = this.currentUserSubject.pipe(distinctUntilChanged());
  // ReplaySubject
  // listen with a buffer size of one('1') user being eliminated and all the later subsequent user before 'OnCompleted'
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public $isAuthenticated = this.isAuthenticatedSubject.pipe(
    distinctUntilChanged()
  );

  get currentUser(): ResponseBody.User {
    return this.currentUserSubject.value;
  }
  isEmailRegisterd(email: string) {
    return this.http.get<{ success: boolean }>(
      `${this.domain}/api/user/email/${email}`
    );
  }
  isUserNameUsed(username: string) {
    return this.http.get<{ success: boolean }>(
      `${this.domain}/api/user/username/${username}`
    );
  }
  get isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }
  register(user: RequestBody.RegisterBody): Observable<any> {
    return this.http.post(this.domain + '/api/user', user, this.options);
  }

  login(credentials: RequestBody.LoginBody): Observable<any> {
    return this.http.post(
      this.domain + '/api/login',
      credentials,
      this.options
    );
  }
  hasRoles(roles: string[]): boolean {
    if (!roles) {
      return true;
    }

    let bHasRole = false;
    const isLogged = this.isLoggedIn();
    if (isLogged) {
      bHasRole =
        roles
          .map(r => r.trim().toLowerCase())
          .indexOf(this.currentUser.role.toLowerCase()) > -1;
    }
    return bHasRole;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  authValidation() {
    if (this.jwtService.getToken()) {
      this.getUserWithToken().subscribe(
        data => {
          if (data.success !== false) {
            this.currentUserSubject.next(data);
            this.isAuthenticatedSubject.next(true);
          } else {
            console.error(data);
          }
        },
        err => this.clearAuth()
      );
    } else {
      this.clearAuth();
    }
  }

  setAuth(res: ResponseBody.LoginBody) {
    this.jwtService.saveToken(res.token);
    this.currentUserSubject.next(res.user);
    this.isAuthenticatedSubject.next(true);
  }

  clearAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  addComment(postId, commentBody) {
    if (this.currentUser) {
      const token = localStorage.getItem('token');
      const body = {
        username: this.currentUser.username,
        userid: this.currentUser._id,
        text: commentBody,
        token
      };
      return this.post(`/api/posts/${postId}/comments`, body);
    }
  }

  get options() {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   charset: 'UTF-8'
    // });
    // if (this.jwtService.getToken()) {
    //   headers.append('authorization', `JWT ${this.jwtService.getToken()}`);
    // }
    // const options = { headers: headers };

    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (this.jwtService.getToken()) {
      headersConfig['authorization'] = this.jwtService.getToken();
    }

    const options = { headers: new HttpHeaders(headersConfig) };
    return options;

    // return options;
  }

  getUserWithToken() {
    return this.http.get<ResponseBody.User>(
      this.domain + `/api/user`,
      this.options
    );
  }
  getUsers(): Observable<any> {
    return this.http.get(this.domain + '/api/users');
  }

  countUsers(): Observable<any> {
    return this.http.get(this.domain + '/api/users/count');
  }

  addUser(user): Observable<any> {
    return this.http.post(this.domain + '/api/user', user, this.options);
  }

  getUser(user): Observable<any> {
    return this.http.get(this.domain + `/api/user/${user._id}`);
  }

  editUser(user): Observable<any> {
    return this.http.put(
      this.domain + `/api/user/${user._id}`,
      user,
      this.options
    );
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(
      this.domain + `/api/user/${user._id}`,
      this.options
    );
  }

  post(url, body): Observable<any> {
    return this.http.post(this.domain + url, body, this.options);
  }

  get(url): Observable<any> {
    return this.http.get(this.domain + url);
  }
}
