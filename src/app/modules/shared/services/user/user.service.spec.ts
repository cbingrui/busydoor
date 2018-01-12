import { RegisterModel } from './../../models/account';

import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { JwtService } from '../jwt.service';

describe('UserService', () => {
  let testbed: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;
  let userMock: RegisterModel;
  let userResponseMock: ResponseBody.UserBody;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, JwtService]
    });
    testbed = getTestBed();
    service = testbed.get(UserService);
    httpMock = testbed.get(HttpTestingController);

    userMock = { username: 'user', email: 'test@gmail.com', password: 'pwd' };
    userResponseMock = {
      user: {
        _id: '123',
        username: 'user',
        email: 'test@gmail.com',
        password: 'pwd'
      }
    };
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Register', () => {
    it('should be registered with RegisterBody', () => {
      service.register(userMock).subscribe(data => {
        expect(data.errMessage).toBeUndefined();
        expect(data.user._id).toBeUndefined();
        expect(data.user.username).toBe(userMock.username);
        expect(data.user.email).toBe(userMock.email);
        expect(data.user.password).toBe(userMock.password);
      });

      const req = httpMock.expectOne(`${service.domain}/api/user`);

      req.flush({ user: userMock });
    });
  });
});
