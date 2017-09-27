import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { SharedModule } from './../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, UserService]
})
export class AccountModule { }
