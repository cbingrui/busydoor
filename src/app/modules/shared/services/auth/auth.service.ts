import { AccountModel } from './../../models/account';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { JwtHelper, AuthHttpError } from 'angular2-jwt';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {
  isAdmin: boolean;

  authToken;
  currentUser = { _id: '', username: '', role: '' };
  jwtHelper: JwtHelper = new JwtHelper();
  public hasRoles(roles: string[]): boolean {
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

  constructor(private userService: UserService) {
    this.currentUser = this.decodeUserFromToken();
  }
  isLoggedIn(): boolean {
    let decodedUser;

    decodedUser = this.decodeUserFromToken();

    const isLogin = !!decodedUser;
    if (isLogin && !this.currentUser) {
      this.setCurrentUser(decodedUser);
    }
    return isLogin;
  }

  registerUser(user: RequestBody.RegisterBody) {
    return this.userService.register(user);
  }

  login(user: RequestBody.LoginBody) {
    return this.userService.login(user).pipe(
      map(res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.jwtHelper.decodeToken(res.token).user;

        this.authToken = res.token;
        this.setCurrentUser(decodedUser);
      })
    );
  }
  setCurrentUser(decodedUser) {
    if (decodedUser) {
      this.currentUser._id = decodedUser._id;
      this.currentUser.username = decodedUser.username;
      this.currentUser.role = decodedUser.role;
    }
  }

  decodeUserFromToken(key = 'token') {
    try {
      const token = localStorage.getItem(key);
      if (token) {
        return this.jwtHelper.decodeToken(token).user;
      }
    } catch (e) {
      console.log(e);
    }
  }

  addComment(postId, commentBody) {
    this.currentUser = this.decodeUserFromToken();
    if (this.currentUser) {
      const token = localStorage.getItem('token');
      const body = {
        username: this.currentUser.username,
        userid: this.currentUser._id,
        text: commentBody,
        token
      };
      return this.userService.post(`/api/posts/${postId}/comments`, body);
    }
  }
}
