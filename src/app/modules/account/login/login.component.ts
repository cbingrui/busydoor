import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: any;
  email: any;
  loginForm: FormGroup;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }


  onLogin() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/']),
      error => console.log(error)
    );
  }
}
