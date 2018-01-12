import { AuthService } from './services/auth/auth.service';
import { LoginGuardService } from './services/login-guard.service';
import { JwtService } from './services/jwt.service';
import { WindowRef } from './window-ref';
import { ToastrService } from './services/toastr/toastr.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MarkdownPipe } from './markdown.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FetchPipe } from './pipes/fetch.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { PaginationComponent } from './pagination/pagination.component';
import { PinHeaderDirective } from './directives/pin-header.directive';
import { CommentsService } from './services/comments/comments.service';
import { RouterLinkStubDirective } from './directives/router-stubs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Cannot use `RouterTestingModule` for lazy loading
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MarkdownPipe,
    FetchPipe,
    PaginationComponent,
    PinHeaderDirective,
    RouterLinkStubDirective
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    MarkdownPipe,
    FetchPipe,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    PinHeaderDirective,
    RouterLinkStubDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,

      providers: [
        AuthService,
        ToastrService,
        UserService,
        WindowRef,
        CommentsService,
        JwtService,
        LoginGuardService
      ]
    };
  }
}
