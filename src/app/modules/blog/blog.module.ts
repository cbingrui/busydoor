import { PostService } from './post/post.service';
import { SharedModule } from './../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PostItemComponent } from './post-item/post-item.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  declarations: [BlogComponent, PostComponent, PostsComponent, PostItemComponent],
  providers: [PostService]
})
export class BlogModule { }
