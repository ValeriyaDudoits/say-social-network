import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public loading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private loadingService: LoadingService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.subscription = this.loadingService.loading$.subscribe(data => this.loading = data);
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
