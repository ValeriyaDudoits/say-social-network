import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    AdminPageComponent,
    AdminFormComponent,
    EditPageComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'create',
        component: AdminPageComponent,
      },
      {
        path: 'edit/:id',
        component: EditPageComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
