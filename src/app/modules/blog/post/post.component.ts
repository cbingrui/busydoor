import { Comment } from './../../shared/models/comment.model';
import { Http } from '@angular/http';

import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { Post } from './../../../models/post.model';
import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostHelper } from './../helper/post.helper';
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

  renderedContent: string;
  constructor(private route: ActivatedRoute
    , private postService: PostService
    , private toastrService: ToastrService
    , private http: Http
    , private postHelper: PostHelper
  ) { }

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
  ngOnInit() {
    const comment1 = new Comment('lorem');
    const comment2 = new Comment('lorem222');
    this.comments.push(comment1, comment2);
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.id = params['id'];
        this.postService.getPostUrl(this.id).subscribe(data => {
          if (data.err) {
            this.toastrService.error(data.err);
          } else {
            this.GetActualRenderContent(data.post);
            this.post = data.post;
          }
        });
      }
    });
  }

}
