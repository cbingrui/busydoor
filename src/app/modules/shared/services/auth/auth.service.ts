import { AccountModel } from './../../models/account';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { JwtHelper, AuthHttpError } from 'angular2-jwt';

@Injectable()
export class AuthService {
  isAdmin: boolean;

  authToken;
  currentUser = { _id: '', username: '', role: '' };
  jwtHelper: JwtHelper = new JwtHelper();
  public hasRoles(roles: string[]): boolean {

    return this.isLoggedIn() && (roles.length === 0
      || roles.map(r => r.trim().toLowerCase()).indexOf(this.currentUser.role.toLowerCase()) > -1);
  }

  constructor(private userService: UserService) {
  }
  isLoggedIn(): boolean {
    let decodedUser;
    try {
      const token: any = localStorage.getItem('token');
      if (token) {
        decodedUser = this.decodeUserFromToken(token);
      }
    } catch (e) {
      return false;
    }
    const isLogin = !!decodedUser;
    return isLogin;
  }

  registerUser(user) {
    return this.userService.register(user).map(res => res.json())
      .map(res => {

      });
  }
  validate(type: string, credentials) {
    if (type === AccountModel.loginName) {
      return this.login(credentials);
    } else {
      return this.registerUser(credentials);
    }
  }
  login(user) {
    return this.userService.login(user).map(res => res.json())
      .map(res => {
        localStorage.setItem('token', res.token);
        this.authToken = res.token;

        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);

      });

  }
  setCurrentUser(decodedUser) {

    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;

  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  addComment(postId, commentBody) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = this.decodeUserFromToken(token);
    }
    const body = {
      username: this.currentUser.username
      , userid: this.currentUser._id
      , text: commentBody
      , token
    };
    return this.userService.post(`/api/posts/${postId}/comments`, body);
  }
}
