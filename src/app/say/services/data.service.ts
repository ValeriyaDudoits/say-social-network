import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICard } from 'src/app/shared/models/card';
import { SAY_URL } from 'src/app/shared/models/constants';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: ICard[] = [];

  public users$ = new BehaviorSubject<string[]>([]);

  public card$ = new Subject<ICard>();

  public data$ = new BehaviorSubject<ICard[]>([]);

  constructor(private http: HttpClient, private loading: LoadingService,
    private toastr: ToastrService) { }

  addData() {
    this.loading.startLoading();
    this.http.get<ICard[]>(SAY_URL).subscribe(data => {
      this.data$.next(data);
      this.data = data;
      this.loading.endLoading();
      this.updateUserList();
    })
  }

  private updateUserList() {
    const users: string[] = [];
    this.data.map(user => users.push(user.name));
    this.users$.next(users);
  }

  getById(id: number) {
    this.loading.startLoading();
    this.http.get<ICard>(`${SAY_URL}/${id}`).subscribe(data => {
      this.card$.next(data);
      this.loading.endLoading();
    })
  }

  deleteUser(id: number) {
    this.loading.startLoading();
    this.http.delete<ICard[]>(`${SAY_URL}/${id}`).subscribe(() => {
      this.loading.endLoading();
      this.data = this.data.filter(user => user.id !== id);
      this.data$.next(this.data);
    });
    this.updateUserList();
    this.toastr.success("You have deleted a user!");
  }

  findUser(name: string) {
    this.data = this.data.filter(user => user.name === name);
    this.data$.next(this.data);
  }

  setUser(data: ICard) {
    this.http.post<ICard[]>(SAY_URL, data).subscribe(data => {
    })
  }

  editUser(id: number, data: ICard) {
    this.http.put<ICard[]>(`${SAY_URL}/${id}`, data).subscribe(data => {
    });
    this.toastr.success("You have edited a user!");
  }

  getId() {
    const ids = this.data.map(item => item.id);
    return Math.max(...ids) + 1;
  }
}
