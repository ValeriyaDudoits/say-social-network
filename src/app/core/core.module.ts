import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
