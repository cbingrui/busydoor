import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { AuthService } from './../../shared/services/auth/auth.service';
import { AccountModel } from './../../shared/models/account';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MinLengthValidator } from '@angular/forms/src/directives/validators';
import { retry } from 'rxjs/operators/retry';

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

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.lastUrlPart = data[data.length - 1].path;
      this.buildForm(this.lastUrlPart);
      this.updateTitle(this.lastUrlPart);
    });
  }

  buildForm(signType: string) {
    this.signForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmail]],
      passwords: this.fb.group(
        {
          password: ['', Validators.required],
          confirm: ''
        }
        // ,{ validator: this.emailMatcher.bind(this) }
      )
    });

    if (this.IsRegister) {
      this.confirmCtrl.setValidators(Validators.required);
      this.passwordsCtrl.setValidators(this.passwordMatcher.bind(this));

      this.signForm.addControl(
        'username',
        new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3)
        ])
      );
    }
  }

  updateTitle(lastUrlPart) {
    this.title =
      lastUrlPart === AccountModel.registerUrl
        ? AccountModel.registerName
        : AccountModel.loginName;
  }

  submitForm() {
    this.isSubmitting = true;

    if (this.title === AccountModel.loginName) {
      this.login();
    } else {
      this.register();
    }
  }

  resetForm() {
    this.signForm.reset();
    this.isSubmitting = false;
  }

  register() {
    const credentialsRegister: RequestBody.RegisterBody = {
      username: this.signForm.value.username,
      email: this.signForm.value.email,
      password: this.signForm.value.passwords.password
    };
    this.authService.registerUser(credentialsRegister).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        this.resetForm();
        console.log('err' + err);
        this.toast.error(err);
      }
    );
  }

  login() {
    const credentialsBody: RequestBody.LoginBody = {
      email: this.signForm.value.email,
      password: this.signForm.value.passwords.password
    };
    this.authService.login(credentialsBody).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        this.resetForm();
        console.log('err' + err);
        this.toast.error(err);
      }
    );
  }

  get authType(): string {
    return '';
  }

  get usernameCtrl() {
    return this.signForm.get('username');
  }
  get emailCtrl() {
    return this.signForm.get('email');
  }
  get passwordCtrl() {
    return this.signForm.get('passwords.password');
  }
  get confirmCtrl() {
    return this.signForm.get('passwords.confirm');
  }
  get passwordsCtrl() {
    return this.signForm.get('passwords');
  }

  get IsRegister(): boolean {
    return this.lastUrlPart === AccountModel.registerUrl;
  }
  passwordMatcher() {
    if (!this.passwordCtrl.value || !this.confirmCtrl.value) {
      return null;
    }
    return this.passwordCtrl.value === this.confirmCtrl.value
      ? null
      : { nomatch: true };
  }

  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // You may need to bind(this) as below when add validator if you need to use 'this' in this scope function.
    // email: ['', [Validators.required, this.validateEmail.bind(this)]],
    if (!controls.value) {
      return null;
    }
    // Create a regular expression
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateEmail: true }; // Return as invalid email
    }
  }
}
