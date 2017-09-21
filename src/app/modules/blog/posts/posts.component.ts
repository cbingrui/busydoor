import { PostService } from './../post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: string[];
  id: string;
  constructor(private route: ActivatedRoute
    , private postService: PostService
  ) { }

  ngOnInit() {
    this.posts = this.postService.getPostUrls();
  }

}
