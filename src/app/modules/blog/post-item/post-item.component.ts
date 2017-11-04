import { Post } from './../../../models/post.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  @Input() id: number;
  tags: string[];
  constructor() { }

  ngOnInit() {
    this.tags = ['markdown', 'testing'];
  }

}
