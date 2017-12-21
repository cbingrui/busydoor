import { ToastrService } from './toastr/toastr.service';
import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.isAuthenticated) {
      return true;
    }

    this.toastr.info('Please login to access this page.');
    this.router.navigate(['/account/login']);
    return false;
  }
}
