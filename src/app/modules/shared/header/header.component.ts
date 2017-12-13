import { ToastrService } from './../services/toastr/toastr.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService
    , private toastr: ToastrService) { }

  ngOnInit() {
  }
  onLogoutClick() {
    localStorage.clear();
    this.toastr.info('logout success');
  }
}
