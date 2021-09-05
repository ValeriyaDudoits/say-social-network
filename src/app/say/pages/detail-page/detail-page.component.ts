import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ICard } from 'src/app/shared/models/card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {

  public card: ICard = {} as ICard;

  private subscription$: Subscription = new Subscription();

  public isAdmin:boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription$ = this.route.params.subscribe((params: Params) => {
      this.dataService.getById(+params.id);
    });
    this.subscription$.add(this.dataService.card$.subscribe(data => {
      this.card = data}));
    this.subscription$.add(this.authService.isAdmin.subscribe(data => this.isAdmin = data));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  isEmptyObject(obj: object) {
    return (Object.keys(obj).length === 0);
  }

}
