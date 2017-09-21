import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent, MarkdownPipe],
  exports: [HeaderComponent, FooterComponent, MarkdownPipe]
})
export class SharedModule { }
