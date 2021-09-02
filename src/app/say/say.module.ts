import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CardsComponent } from './components/cards/cards.component';



@NgModule({
  declarations: [
    MainPageComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class SayModule { }
