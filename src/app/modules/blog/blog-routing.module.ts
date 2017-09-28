import { PostEditComponent } from './post-edit/post-edit.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: ':id', component: PostComponent },
  { path: 'post/new', component: PostEditComponent },
  { path: 'post/edit/:id', component: PostEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
