import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth = new BehaviorSubject(true); //check

  public isAdmin = new BehaviorSubject(true); //check

  public authName = new BehaviorSubject('');

  constructor(private router: Router) { }

  login(name: string) {
    this.authName.next(name);
    this.isAuth.next(true);
    this.router.navigate(['/main']);
  }

  logout() {
    this.authName.next('');
    this.isAuth.next(false);
    this.isAdmin.next(false);
    this.router.navigate(['/login']);
  }

  loginAsAdmin() {
    this.isAdmin.next(true);
  }
}
