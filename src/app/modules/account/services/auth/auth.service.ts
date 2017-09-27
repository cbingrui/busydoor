import { UserService } from './../user/user.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  isAdmin: boolean;
  loggedIn: boolean;

  authToken;
  currentUser = { _id: '', username: '', role: '' };
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private userService: UserService) { }

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
        return this.loggedIn;
      });

  }
  setCurrentUser(decodedUser) {
    this.loggedIn = true;
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
