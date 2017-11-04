import { PostHelper } from './helper/post.helper';
import { AccountModule } from './../account/account.module';
import { PostService } from './post/post.service';
import { SharedModule } from './../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    AccountModule
  ],
  declarations: [BlogComponent, PostComponent, PostsComponent, PostItemComponent, PostEditComponent, PostCommentComponent],
  providers: [PostService, PostHelper]
})
export class BlogModule { }
