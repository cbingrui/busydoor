import { UserService } from './../../shared/services/user/user.service';
import { Comment } from './../../shared/models/comment.model';

import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { Post } from './../../../models/post.model';
import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostHelper } from './../helper/post.helper';
import { CommentsService } from './../../shared/services/comments/comments.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: string;
  post: Post;
  comments: Comment[] = [];
  private cachedData: any = '';
  public cachedUrl = '';
  commentControl = new FormControl();
  renderedContent: string;
  isLoggedIn = false;
  curUserId = '';
  role = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private toastrService: ToastrService,
    private postHelper: PostHelper,
    private commentService: CommentsService,
    public userService: UserService,
    private router: Router
  ) {}

  public GetActualRenderContent(post: Post) {
    const url = post.contentUrl;
    if (url === '' || url === undefined) {
      this.renderedContent = this.postHelper.AfterMarkdown(post.body);
    } else if (url !== this.cachedUrl) {
      this.cachedData = null;
      this.cachedUrl = url;
      this.postService.fetchContent(url).subscribe(result => {
        this.cachedData = this.postHelper.AfterMarkdown(result);
        this.renderedContent = this.cachedData;
      });
    }
  }
  addComment() {
    const commentBody = this.commentControl.value;

    this.commentService.addComment(this.post._id, commentBody).subscribe(
      comment => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
      },
      errors => {
        console.log(errors);
      }
    );
  }

  getComments() {
    this.commentService.getComments(this.post._id).subscribe(data => {
      console.log(`comments:${data.comments}`);
      this.comments = data.comments;
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
          if (data.err) {
            this.toastrService.error(data.err);
          } else {
            this.GetActualRenderContent(data.post);
            this.post = data.post;
            this.getComments();
          }
        });
      }
    });
  }
  deleteArticle() {
    this.postService.delete(this.id).subscribe(data => {
      if (data.err) {
        this.toastrService.error(data.err);
      } else {
        this.router.navigateByUrl('/blog');
      }
    });
  }
  onDeleteComment(comment: Comment) {
    this.postService.deleteComment(this.id, comment._id).subscribe(res => {
      if (res.error) {
        this.toastrService.error(res.message);
      } else {
        this.comments.splice(this.comments.indexOf(comment), 1);
      }
    });
  }
}
