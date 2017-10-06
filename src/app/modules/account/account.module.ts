

import { SharedModule } from './../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent, ProfileComponent]
})
export class AccountModule { }
