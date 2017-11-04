import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { AuthService } from './../../shared/services/auth/auth.service';
import { AccountModel } from './../../shared/models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.css']
})
export class SignInUpComponent implements OnInit {

  title = '';

  signForm: FormGroup;
  isSubmitting = false;
  lastUrlPart = '';
  signType = { register: 'Sign up', login: 'Sign in' };
  constructor(private route: ActivatedRoute
    , private fb: FormBuilder
    , private authService: AuthService
    , private toast: ToastrService
    , private router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.lastUrlPart = data[data.length - 1].path;
      this.buildForm(this.lastUrlPart);
      this.updateTitle(this.lastUrlPart);
    });
  }

  buildForm(signType: string) {
    this.signForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    if (this.IsRegister) {
      this.signForm.addControl('username', new FormControl('', Validators.required));
    }
  }
  updateTitle(lastUrlPart) {
    this.title = lastUrlPart === AccountModel.registerUrl
      ? AccountModel.registerName : AccountModel.loginName;
  }
  submitForm() {
    this.isSubmitting = true;

    const credentials = this.signForm.value;

    this.authService.validate(this.title, credentials).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        console.log('err' + err);
        this.toast.error(err);
      }
    );

  }

  get authType(): string {
    return '';
  }
  sss() {

  }

  get IsRegister(): boolean {
    return this.lastUrlPart === AccountModel.registerUrl;
  }
}
