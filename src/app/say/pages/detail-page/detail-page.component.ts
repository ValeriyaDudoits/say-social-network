import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguagService } from 'src/app/core/services/language.service';
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

  public isAdmin: boolean = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public translate: TranslateService,
    private langService: LanguagService) { }

  ngOnInit(): void {
    this.subscription$ = this.route.params.subscribe((params: Params) => {
      this.dataService.getById(+params.id);
    });
    this.subscription$.add(this.dataService.card$.subscribe((data) => {
      this.card = data;
    }));
    this.subscription$.add(this.authService.isAdmin.subscribe((data) => this.isAdmin = data))
      .add(this.langService.language.subscribe((data) => this.translate.use(data)));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  isEmptyObject(obj: object) {
    return (Object.keys(obj).length === 0);
  }
}
