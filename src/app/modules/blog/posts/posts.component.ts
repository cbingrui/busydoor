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
  posts: Post[];
  id: string;
  totalRecords = 0;
  pageSize = 5;
  currentPage = 1;
  constructor(private route: ActivatedRoute
    , private postService: PostService
  ) { }

  ngOnInit() {
    this.getPostPage(1);
  }
  getPostPage(pageIndex: number) {
    this.postService.getPostUrls((pageIndex - 1) * this.pageSize, this.pageSize)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);

        } else {
          // for 'renderedContent' getter property template binding
          console.log(data);
          this.posts = (data.posts)
            .map(p => new Post(p._id, p.title, p.body, p.timestamp, p.contentUrl, p.summary));
          this.totalRecords = data.postCount;
        }
      });
  }

  onPageChanged(page: number) {

    this.getPostPage(page);

  }
}
