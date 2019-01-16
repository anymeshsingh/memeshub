import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../providers/authentication.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    // return this.auth.user$.pipe(
    //   take(1),
    //   map(user => !!user),
    //   tap(loggedin => {
    //     if(loggedin){
    //       this.router.navigate(['/']);
    //     }
    //   })
    // );

    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        if(!user){
          this.router.navigate(['/']);
          return false;
        } else{
          return true;
        }
      }),
    );
  }
}
