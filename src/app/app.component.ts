import { Component } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';
import { take, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthenticationService, private router: Router){
    // this.auth.user$.pipe(
    //   take(1),
    //   map(user => user),
    //   tap(loggedin => {
    //     if(loggedin){
    //       this.router.navigate(['/memes']);
    //       }
    //     }
    //   )
    // );
    // this.auth.user$.subscribe(user=>{
    //   if(user){
    //     this.router.navigate(['/memes']);
    //   }
    // })
  }
}
