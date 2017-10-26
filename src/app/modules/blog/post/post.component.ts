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

      return this.postHelper.AfterMarkdown(post.body);
    }
    if (url !== this.cachedUrl) {
      this.cachedData = null;
      this.cachedUrl = url;
      this.postService.fetchContent(url).subscribe(result =>
        this.cachedData = this.postHelper.AfterMarkdown(result));
    }
    return this.cachedData;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.id = params['id'];
        this.postService.getPostUrl(this.id).subscribe(data => {
          if (data.err) {
            this.toastrService.error(data.err);
          } else {
            this.renderedContent = this.GetActualRenderContent(data.post);
            this.post = data.post;
          }
        });
      }
    });
  }

}
