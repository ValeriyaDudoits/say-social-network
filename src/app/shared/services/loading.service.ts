import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading$ = new BehaviorSubject(false);

  startLoading() {
    this.loading$.next(true);
  }

  endLoading() {
    this.loading$.next(false);
  }
}
