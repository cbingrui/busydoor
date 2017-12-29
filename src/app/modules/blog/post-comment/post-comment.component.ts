import Comment from '../../../models/comment.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {
  @Input() isEditable: boolean;
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.deleteComment.emit();
  }
}
