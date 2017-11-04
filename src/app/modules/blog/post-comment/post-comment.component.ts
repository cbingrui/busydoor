import { Comment } from './../../shared/models/comment.model';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  createdAt = new Date();
  @Input() comment: Comment;
  constructor() { }

  ngOnInit() {
  }

  onDeleteComment() {

  }
}
