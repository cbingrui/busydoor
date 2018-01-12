import { RegisterModel } from './../../models/account';
import { JwtService } from './../jwt.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';
import Comment from '../../../../models/comment.model';
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
  public isAuthenticated$ = this.isAuthenticatedSubject.pipe(
    distinctUntilChanged()
  );

  get currentUser(): ResponseBody.User {
    const value = this.currentUserSubject.value;
    if (value) {
      return value;
    } else {
      return <ResponseBody.User>{
        _id: '',
        username: '',
        email: '',
        role: '',
        password: ''
      };
    }
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
  resetPassword(password: string, token: string) {
    return this.http.put<{ error: string; message: string }>(
      `${this.domain}/api/user/password`,
      { password, token },
      this.options
    );
  }
  checkResetExpired(token: string) {
    return this.http.get<{ error: string; message: string }>(
      `${this.domain}/api/user/password/token/${token}`
    );
  }
  emailPasswordReset(email: string) {
    return this.http.get<{ error: string; message: string }>(
      `${this.domain}/api/user/emailpasswordreset/${email}`
    );
  }
  get isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }
  register(user: RegisterModel) {
    return this.http.post<ResponseBody.UserBody>(
      this.domain + '/api/user',
      user,
      this.options
    );
  }

  login(credentials: RequestBody.LoginBody): Observable<any> {
    return this.http.post(
      this.domain + '/api/login',
      credentials,
      this.options
    );
  }

  withAuth(userId?: string) {
    if (!userId) {
      return this.withAnyRole([' Admin ']);
    } else {
      return this.currentUser._id === userId || this.withAnyRole(['Admin']);
    }
  }

  withAnyRole(roles: string[]): boolean {
    if (!roles) {
      return true;
    }

    let bHasRole = false;
    if (this.isLoggedIn) {
      bHasRole =
        roles
          .map(r => r.trim().toLowerCase())
          .indexOf(this.currentUser.role.toLowerCase()) > -1;
    }
    return bHasRole;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  authValidation() {
    if (this.jwtService.getToken()) {
      this.getUserWithToken().subscribe(
        data => {
          if (data.errMessage) {
            console.error(data.errMessage);
          } else {
            this.currentUserSubject.next(data.user);
            this.isAuthenticatedSubject.next(true);
          }
        },
        err => this.clearAuth()
      );
    } else {
      this.clearAuth();
    }
  }

  setAuth(res: ResponseBody.LoginBody) {
    if (!res) {
      return;
    }
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
    if (this.isLoggedIn) {
      const token = localStorage.getItem('token');
      const body = new Comment({
        _id: null,
        username: this.currentUser.username,
        userid: this.currentUser._id,
        text: commentBody,
        posted: null
      });
      return this.http.post<ResponseBody.CommentBody>(
        `${this.domain}/api/posts/${postId}/comments`,
        body,
        this.options
      );
    }
  }

  get options() {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (this.jwtService.getToken()) {
      headersConfig['authorization'] = this.jwtService.getToken();
    }

    const options = { headers: new HttpHeaders(headersConfig) };
    return options;
  }

  getUserWithToken() {
    return this.http.get<ResponseBody.UserBody>(
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

  get<T>(url) {
    return this.http.get<T>(this.domain + url);
  }
}
