import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnDestroy {
  private isAdmin$ = false;

  private subscription = new Subscription();

  constructor(private router: Router, private auth: AuthService, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.subscription = this.auth.isAdmin.subscribe(data => {
      this.isAdmin$ = data
    })
    if (this.isAdmin$) {
      return true;
    } else {
      this.router.navigate(['/main']);
      this.toastr.error("Please, login as Admin");
      return false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
