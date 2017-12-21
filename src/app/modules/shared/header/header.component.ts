import { UserService } from './../services/user/user.service';
import { ToastrService } from './../services/toastr/toastr.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserService, private toastr: ToastrService) {}

  ngOnInit() {}
  onLogoutClick() {
    this.userService.clearAuth();
    this.toastr.info('logout success');
  }
}
