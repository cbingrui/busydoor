import { Injectable } from '@angular/core';
import { UserService } from './../user/user.service';
import Comment from '../../../../models/comment.model';

@Injectable()
export class CommentsService {
  constructor(private userService: UserService) {}
  addComment(postId: string, commentBody: string) {
    return this.userService.addComment(postId, commentBody);
  }
  getComments(postId: string) {
    return this.userService.get<ResponseBody.CommentsBody>(
      `/api/posts/${postId}/comments`
    );
  }
}
