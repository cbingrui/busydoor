import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule' },
  { path: 'blog', loadChildren: 'app/modules/blog/blog.module#BlogModule' },
  { path: 'about', loadChildren: 'app/modules/about/about.module#AboutModule' },
  { path: 'account', loadChildren: 'app/modules/account/account.module#AccountModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

