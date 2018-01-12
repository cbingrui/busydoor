import { UserService } from './../user/user.service';
import { TestBed, inject } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtService } from '../jwt.service';

describe('CommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService, UserService, JwtService]
    });
  });

  it(
    'should be created',
    inject([CommentsService], (service: CommentsService) => {
      expect(service).toBeTruthy();
    })
  );
});
