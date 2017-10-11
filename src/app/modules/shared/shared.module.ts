import { AuthService } from './services/auth/auth.service';
import { ToastrService } from './services/toastr/toastr.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MarkdownPipe } from './markdown.pipe';
import { HttpModule } from '@angular/http';
import { FetchPipe } from './pipes/fetch.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MarkdownPipe,
    FetchPipe,
    PaginationComponent],
  providers: [
    ToastrService,
    AuthService,
    UserService
  ],
  exports: [HeaderComponent,
    FooterComponent,
    MarkdownPipe,
    FetchPipe,
    ReactiveFormsModule,
    PaginationComponent]
})
export class SharedModule { }
