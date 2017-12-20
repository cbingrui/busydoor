import { SharedModule } from './../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';

@NgModule({
  imports: [CommonModule, SharedModule, AccountRoutingModule],
  declarations: [ProfileComponent, SignInUpComponent]
})
export class AccountModule {}
