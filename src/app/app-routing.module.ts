import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main', loadChildren: () => import('./say/say.module').then((m) => m.SayModule),

  },
  {
    path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
