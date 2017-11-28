import { WindowRef } from './window-ref';
import { AuthService } from './services/auth/auth.service';
import { ToastrService } from './services/toastr/toastr.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MarkdownPipe } from './markdown.pipe';
import { HttpModule } from '@angular/http';
import { FetchPipe } from './pipes/fetch.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { PaginationComponent } from './pagination/pagination.component';
import { PinHeaderDirective } from './directives/pin-header.directive';
import { CommentsService } from 'app/modules/shared/services/comments/comments.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MarkdownPipe,
    FetchPipe,
    PaginationComponent,
    PinHeaderDirective],

  exports: [HeaderComponent,
    FooterComponent,
    MarkdownPipe,
    FetchPipe,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    PinHeaderDirective]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,

      providers: [ToastrService,
        AuthService,
        UserService,
        WindowRef,
        CommentsService]
    };
  }
}
