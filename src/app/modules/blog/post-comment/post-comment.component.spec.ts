import { SharedModule } from './../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentComponent } from './post-comment.component';
import Comment from '../../../models/comment.model';
describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;
  let commentMock: Comment;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [PostCommentComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    commentMock = {
      _id: '',
      userid: '',
      username: '',
      text: '',
      posted: null
    };
  });

  it('should create', () => {
    component.comment = commentMock;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
