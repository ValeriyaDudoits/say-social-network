import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SharedModule { }
