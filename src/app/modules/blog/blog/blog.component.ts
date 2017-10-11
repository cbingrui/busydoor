import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor() {
  }
  str = 'https://raw.githubusercontent.com/cbingrui/busydoor_posts/master/posts/Test%20markdown.md';

  ngOnInit() {
  }

  onPageChanged(page: number) {

    console.log(page);

  }

}
