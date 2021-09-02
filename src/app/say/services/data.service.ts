import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICard } from 'src/app/shared/models/card';
import { SAY_URL } from 'src/app/shared/models/constants';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public card$ = new Subject<ICard>();

  public data$ = new BehaviorSubject<ICard[]>([]);

  constructor(private http: HttpClient, private loading: LoadingService) { }

  addData() {
    this.loading.startLoading();
    this.http.get<ICard[]>(SAY_URL).subscribe(data => {
        this.data$.next(data);
        this.loading.endLoading();
    })
  }

  getById(id: number) {
    this.loading.startLoading();
    this.http.get<ICard>(`${SAY_URL}/${id}`).subscribe(data => {
      this.card$.next(data);
      this.loading.endLoading();
    })
  }
}
