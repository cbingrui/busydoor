import { SharedModule } from './../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
