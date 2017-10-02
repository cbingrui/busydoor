import { Post } from './../../../models/post.model';
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
  posts;
  id: string;
  constructor(private route: ActivatedRoute
    , private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getPostUrls().subscribe(data => {
      if (data.err) {
        console.log(data.err);

      } else {
        // for 'renderedContent' getter property template binding
        this.posts = (data.posts).map(p => new Post(p._id, p.title, p.body, p.timestamp, p.contentUrl, ));
      }

    });
  }

}
