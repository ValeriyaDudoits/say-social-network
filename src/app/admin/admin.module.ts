import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    AdminPageComponent,
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminPageComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
