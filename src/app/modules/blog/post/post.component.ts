import { UserService } from './../../shared/services/user/user.service';

import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { Post } from './../../../models/post.model';
import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentsService } from './../../shared/services/comments/comments.service';
import { FormControl } from '@angular/forms';
import Comment from '../../../models/comment.model';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: string;
  post: Post;
  comments: Comment[] = [];
  commentControl = new FormControl();
  isLoggedIn = false;
  curUserId = '';
  role = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private toastrService: ToastrService,
    private commentService: CommentsService,
    public userService: UserService,
    private router: Router
  ) {}

  addComment() {
    const commentBody = this.commentControl.value;

    this.commentService.addComment(this.post._id, commentBody).subscribe(
      data => {
        if (data) {
          if (data.errMessage) {
            this.toastrService.error(data.errMessage);
          } else {
            this.comments.unshift(data.comment);
            this.commentControl.reset('');
          }
        } else {
          this.toastrService.error('Add comment failed.');
        }
      },
      errors => {
        this.toastrService.error(errors);
      }
    );
  }

  getComments() {
    this.commentService.getComments(this.post._id).subscribe(data => {
      if (data) {
        if (data.errMessage) {
          this.toastrService.error(data.errMessage);
        } else {
          this.comments = data.comments;
        }
      }
    });
  }
  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn;
    if (this.isLoggedIn) {
      this.curUserId = this.userService.currentUser._id;
      this.role = this.userService.currentUser.role;
    }
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.id = params['id'];
        this.postService.getPostUrl(this.id).subscribe(data => {
          if (!data) {
            this.toastrService.error(`not data return for post:${this.id}`);
          } else if (data.errMessage) {
            this.toastrService.error(data.errMessage);
          } else {
            this.post = new Post(data.post);
            this.getComments();
          }
        });
      }
    });
  }
  deleteArticle() {
    this.postService.delete(this.id).subscribe(data => {
      if (!data) {
        this.router.navigateByUrl('/blog');
      } else if (data.errMessage) {
        this.toastrService.error(data.errMessage);
      }
    });
  }
  onDeleteComment(comment: Comment) {
    this.postService.deleteComment(this.id, comment._id).subscribe(res => {
      if (!res) {
        this.comments.splice(this.comments.indexOf(comment), 1);
      } else if (res.errMessage) {
        this.toastrService.error(res.errMessage);
      }
    });
  }
}
