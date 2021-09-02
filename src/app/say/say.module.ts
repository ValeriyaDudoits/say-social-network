import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './components/cards/cards.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { PostComponent } from './components/post/post.component';



@NgModule({
  declarations: [
    MainPageComponent,
    CardsComponent,
    CardComponent,
    DetailPageComponent,
    PostComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
      },
      {
        path: ':id',
        component: DetailPageComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class SayModule { }
