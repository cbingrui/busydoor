import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  KEY_JWT = 'jwt';
  getToken(): string {
    return localStorage.getItem(this.KEY_JWT);
  }

  saveToken(token: string) {
    console.log(token);
    localStorage.setItem(this.KEY_JWT, token);
  }

  destroyToken() {
    localStorage.removeItem(this.KEY_JWT);
  }
}
