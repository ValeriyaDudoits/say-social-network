import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICard } from 'src/app/shared/models/card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public card: ICard = {} as ICard;

  private subscription$: Subscription = new Subscription();

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription$ = this.route.params.subscribe((params: Params) => {
      this.dataService.getById(+params.id);
    });
    this.subscription$.add(this.dataService.card$.subscribe(data => {
      this.card = data}));
  }

  isEmptyObject(obj: object) {
    return (Object.keys(obj).length === 0);
  }

}
