import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  private isAuth$ = false;

  private subscription = new Subscription();

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.subscription = this.auth.isAuth.subscribe((data) => {
      this.isAuth$ = data;
    });
    if (this.isAuth$) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
