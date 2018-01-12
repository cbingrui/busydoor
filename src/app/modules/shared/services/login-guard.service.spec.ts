import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from './toastr/toastr.service';
import { UserService } from './user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { LoginGuardService } from './login-guard.service';
import { JwtService } from './jwt.service';

describe('LoginGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [LoginGuardService, UserService, JwtService, ToastrService]
    });
  });

  it(
    'should be created',
    inject([LoginGuardService], (service: LoginGuardService) => {
      expect(service).toBeTruthy();
    })
  );
});
