import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin/guard/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main', loadChildren: () => import('./say/say.module').then((m) => m.SayModule),
    canActivate: [AuthGuard],

  },
  {
    path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],

  },
  {
    path: '**', component: NotFoundPageComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
