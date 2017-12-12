import { Injectable } from '@angular/core';
import { AuthService } from 'app/modules/shared/services/auth/auth.service';
import { UserService } from 'app/modules/shared/services/user/user.service';

@Injectable()
export class CommentsService {

  constructor(private authService: AuthService,
    private userService: UserService) {

  }
  addComment(postId: string, commentBody: string) {
    return this.authService.addComment(postId, commentBody);
  }
  getComments(postId: string) {
    return this.userService.get(`/api/posts/${postId}/comments`);
  }
}
