import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading$ = new BehaviorSubject(false)

  constructor() { }

  startLoading() {
    this.loading$.next(true);
  }

  endLoading() {
    this.loading$.next(false);
  }
}
