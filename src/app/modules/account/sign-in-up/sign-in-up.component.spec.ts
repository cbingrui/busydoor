import { RequestUser } from './../../shared/models/httpclient.model';
import { UserService } from './../../shared/services/user/user.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AbstractControl } from '@angular/forms/src/model';
import { AccountModel } from './../../shared/models/account';
import { SharedModule } from './../../shared/shared.module';
import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { SignInUpComponent } from './sign-in-up.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router/src/router_module';
import { HttpParams, HttpRequest } from '@angular/common/http';

describe('SignInUpComponent', () => {
  const debounchTime = 400;
  let component: SignInUpComponent;
  let fixture: ComponentFixture<SignInUpComponent>;
  let emailCtrl: AbstractControl,
    passwordCtrl: AbstractControl,
    confirmCtrl: AbstractControl,
    usernameCtrl: AbstractControl,
    passwordsCtrl: AbstractControl;
  let testbed: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        // RouterTestingModule has to be added manually instead of adding in `SharedModule` for lazy loading
        imports: [
          SharedModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule
        ],

        declarations: [SignInUpComponent],
        providers: [UserService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
        .compileComponents()
        .then(() => {
          testbed = getTestBed();
          service = testbed.get(UserService);
          httpMock = testbed.get(HttpTestingController);
        });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInUpComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Register process', () => {
    beforeEach(() => {
      component.updatePageStatus(AccountModel.registerUrl);
      fixture.detectChanges();
      emailCtrl = component.emailCtrl;
      passwordCtrl = component.passwordCtrl;
      confirmCtrl = component.confirmCtrl;
      usernameCtrl = component.usernameCtrl;
      passwordsCtrl = component.passwordsCtrl;
    });
    afterEach(() => {
      component.resetForm();
      httpMock.verify();
    });

    it('all controls should be invalid when init', () => {
      expect(component.signForm.valid).toBeFalsy();
      expect(emailCtrl.valid).toBeFalsy();
      expect(usernameCtrl.valid).toBeFalsy();
      expect(passwordsCtrl.valid).toBeFalsy();
    });

    describe('test email', () => {
      it('email field validity', () => {
        const errors = emailCtrl.errors || {};
        expect(errors['required']).toBeTruthy();
        expect(errors['validateEmail']).toBeUndefined();
      });

      it('should be without any error with valid email format', () => {
        emailCtrl.setValue('test@gmail.com');
        fixture.detectChanges();
        const errors = emailCtrl.errors || {};
        expect(errors['required']).toBeUndefined();
        expect(errors['validateEmail']).toBeUndefined();
      });

      it('should be with `validateEmail` error with invalid email format', () => {
        emailCtrl.setValue('test_invalid_email');
        fixture.detectChanges();
        const errors = emailCtrl.errors || {};
        expect(errors['required']).toBeUndefined();
        expect(errors['validateEmail']).toBeTruthy();
      });

      it(
        'should with `uniqueEmail` error when email is existed',
        fakeAsync(() => {
          testUniqueEmail(false);
          expect(emailCtrl.errors['uniqueEmail']).toBeTruthy();
        })
      );

      it(
        'should without `uniqueEmail` error when email is not existed',
        fakeAsync(() => {
          testUniqueEmail(true);
          const errors = emailCtrl.errors || {};
          expect(errors['uniqueEmail']).toBeUndefined();
        })
      );

      function testUniqueEmail(status: boolean) {
        const email = 'one_existed@gmail.com';
        emailCtrl.setValue(email);

        //  `400` is the same as `Rx.Observable.timer(400)` in `validUniqueEmail` method
        tick(debounchTime);

        httpMock
          .expectOne({
            url: `${service.domain}/api/user/email/${email}`,
            method: 'GET'
          })
          .flush({ success: status });
      }
    });

    describe('test whole form', () => {
      it('should not immediately connect to the server to check username and email', () => {
        httpMock.expectNone({});
      });

      it(
        'should be valid when all forms are valid',
        fakeAsync(() => {
          const email = 'admin@gmail.com';
          const username = 'admin';
          const password = 'pwd';

          usernameCtrl.setValue(username);
          emailCtrl.setValue(email);
          passwordCtrl.setValue(password);
          confirmCtrl.setValue(password);
          tick(debounchTime);
          httpMock
            .expectOne(`${service.domain}/api/user/email/${email}`)
            .flush({ success: true });
          httpMock
            .expectOne(`${service.domain}/api/user/username/${username}`)
            .flush({ success: true });

          expect(component.signForm.valid).toBeTruthy();
        })
      );
    });

    describe('submit form for registration', () => {
      it('should submit success', () => {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          email = 'admin@gmail.com',
          username = 'admin',
          password = 'pwd',
          apiUrl = '/api/user';

        usernameCtrl.setValue(username);
        emailCtrl.setValue(email);
        passwordCtrl.setValue(password);
        confirmCtrl.setValue(password);
        fixture.detectChanges();
        component.submitForm();

        httpMock.expectOne((req: HttpRequest<RequestUser>) => {
          const body = req.body;

          return (
            req.url === `${service.domain}${apiUrl}` &&
            req.method === 'POST' &&
            req.headers.get('Accept') === headersConfig.Accept &&
            req.headers.get('Content-Type') === headersConfig['Content-Type'] &&
            body.username === username &&
            body.password === password &&
            body.email === email
          );
        }, `POST to ${apiUrl} with email, username and password`);
      });
    });
  });
});
