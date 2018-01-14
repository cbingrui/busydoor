import { UserService } from './../../shared/services/user/user.service';
import { ToastrService } from './../../shared/services/toastr/toastr.service';
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
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MinLengthValidator } from '@angular/forms/src/directives/validators';
import {
  debounceTime,
  filter,
  distinctUntilChanged,
  map,
  delay
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.css']
})
export class SignInUpComponent implements OnInit, AfterViewChecked {
  title = '';

  signForm: FormGroup;
  isSubmitting = false;
  lastUrlPart = '';
  signType = { register: 'Sign up', login: 'Sign in' };
  resetToken = undefined;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastrService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.updatePageStatus(data[data.length - 1].path);
    });
  }

  updatePageStatus(value: string) {
    this.lastUrlPart = value;
    this.buildForm(value);
    this.updateTitle(value);
  }

  buildForm(signType: string) {
    if (signType === AccountModel.resetpasswordUrl) {
      this.resetToken = this.route.snapshot.queryParams['token'];
      this.userService.checkResetExpired(this.resetToken).subscribe(res => {
        if (res.error) {
          this.toast.error(res.message);
          this.title = res.message;
          this.signForm.disable();
        }
      });
      this.signForm = this.fb.group({
        passwords: this.fb.group({
          password: ['', Validators.required],
          confirm: ['', Validators.required]
        })
      });
      this.passwordsCtrl.setValidators(this.passwordMatcher.bind(this));
      return;
    }
    if (signType === AccountModel.findpasswordUrl) {
      this.signForm = this.fb.group({
        email: [
          '',
          [Validators.required, this.validateEmail],
          this.validExistEmail.bind(this)
        ]
      });
      return;
    }
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
      this.emailCtrl.setAsyncValidators(this.validUniqueEmail.bind(this));
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
      this.usernameCtrl.setAsyncValidators(this.uniqueUsername.bind(this));
    }
  }

  updateTitle(lastUrlPart) {
    let title = '';
    switch (lastUrlPart) {
      case AccountModel.registerUrl:
        title = AccountModel.registerName;
        break;
      case AccountModel.resetpasswordUrl:
        title = AccountModel.resetpasswordName;
        break;
      case AccountModel.loginUrl:
        title = AccountModel.loginName;
        break;
      case AccountModel.findpasswordUrl:
        title = AccountModel.findpasswordName;
        break;
    }
    this.title = title;
  }

  submitForm() {
    this.isSubmitting = true;

    switch (this.lastUrlPart) {
      case AccountModel.loginUrl:
        this.login();
        break;
      case AccountModel.registerUrl:
        this.register();
        break;
      case AccountModel.findpasswordUrl:
        this.emailPasswordReset();
        break;
      case AccountModel.resetpasswordUrl:
        this.resetPassword();
        break;
    }
  }
  resetPassword() {
    this.userService
      .resetPassword(this.passwordCtrl.value, this.resetToken)
      .subscribe(res => {
        if (res.error) {
          this.toast.error(res.error);
        } else {
          this.toast.success(res.message);
        }
        this.resetForm();
      });
  }
  emailPasswordReset() {
    this.userService.emailPasswordReset(this.emailCtrl.value).subscribe(res => {
      if (res.error) {
        this.toast.error(res.error);
      } else {
        this.toast.success(res.message);
      }
    });
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
    this.userService.register(credentialsRegister).subscribe(
      res => {
        if (res.errMessage) {
          this.toast.error(res.errMessage);
        } else {
          this.router.navigate(['/account/login']);
          this.toast.success('You can login with new account!');
        }
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
    this.userService.login(credentialsBody).subscribe(
      res => {
        this.userService.setAuth(res);
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
  get IsForgot() {
    return this.lastUrlPart === AccountModel.findpasswordUrl;
  }
  get IsReset(): boolean {
    return this.lastUrlPart === AccountModel.resetpasswordUrl;
  }
  get showUsername() {
    return this.IsRegister && !this.IsForgot;
  }
  get showEmail() {
    return this.lastUrlPart !== AccountModel.resetpasswordUrl || this.IsForgot;
  }
  get showConfirm() {
    return this.lastUrlPart !== AccountModel.loginUrl && !this.IsForgot;
  }

  get showPassword() {
    return !this.IsForgot;
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

  uniqueUsername(control: AbstractControl) {
    return Rx.Observable.timer(400)
      .distinctUntilChanged()
      .switchMap(() => {
        return this.userService.isUserNameUsed(control.value).pipe(
          map(res => {
            return res.success ? null : { existUserName: true };
          })
        );
      });
  }

  validUniqueEmail(control: AbstractControl, should) {
    return Rx.Observable.timer(400)
      .distinctUntilChanged()
      .switchMap(() => {
        return this.userService.isEmailRegisterd(control.value).pipe(
          map(res => {
            return res.success ? null : { uniqueEmail: true };
          })
        );
      });
  }
  validExistEmail(control: AbstractControl, should) {
    return Rx.Observable.timer(400)
      .distinctUntilChanged()
      .switchMap(() => {
        return this.userService.isEmailRegisterd(control.value).pipe(
          map(res => {
            return !res.success ? null : { existEmail: true };
          })
        );
      });
  }
}
