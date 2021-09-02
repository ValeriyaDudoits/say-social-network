import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICard } from 'src/app/shared/models/card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {
  public cards: ICard[] = [];

  private subscription = new Subscription();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.addData();
    this.subscription = this.dataService.data$.subscribe(data => this.cards = data);
  }

  ngOnDestroy() {
    this.cards = [];
    this.subscription.unsubscribe();
  }

}
