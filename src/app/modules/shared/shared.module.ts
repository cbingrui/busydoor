import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MarkdownPipe } from './markdown.pipe';
import { HttpModule } from '@angular/http';
import { FetchPipe } from './pipes/fetch.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  declarations: [HeaderComponent, FooterComponent, MarkdownPipe, FetchPipe],
  exports: [HeaderComponent, FooterComponent, MarkdownPipe, FetchPipe]
})
export class SharedModule { }
