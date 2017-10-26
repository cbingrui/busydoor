import { UserService } from './../user/user.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  isAdmin: boolean;

  authToken;
  currentUser = { _id: '', username: '', role: '' };
  jwtHelper: JwtHelper = new JwtHelper();

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

  login(user) {
    return this.userService.login(user).map(res => res.json())
      .map(res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);

      });

  }
  setCurrentUser(decodedUser) {

    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }
}