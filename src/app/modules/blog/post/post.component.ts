import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  id: string;
  postUrl: string;
  constructor(private route: ActivatedRoute
    , private postService: PostService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.id = params['id'];
        this.postUrl = this.postService.getPostUrl(this.id);
      }
    })
  }

}
