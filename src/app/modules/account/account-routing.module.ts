import { LoginGuardService } from './../shared/services/login-guard.service';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    component: SignInUpComponent
  },
  {
    path: 'login',
    component: SignInUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'resetpassword',
    component: SignInUpComponent
  },
  {
    path: 'findpassword',
    component: SignInUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
