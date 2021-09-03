import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/say/services/data.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  public myControl = new FormControl();

  public isAuth: boolean = false;

  public isAdmin: boolean = false;

  private subscription: Subscription = new Subscription();

  private userList: string[] = [];

  public filteredOptions: Observable<string[]> = new Observable();

  constructor(public authService: AuthService, public userService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isAuth.subscribe(data => this.isAuth = data)
    .add(this.authService.isAdmin.subscribe(data => this.isAdmin = data)).add(this.userService.users$.subscribe(data => this.userList = data));
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.userList.filter(user => user.toLowerCase().includes(filterValue));
  }

  findUser() {
    this.userService.findUser(this.myControl.value);
  }
}
