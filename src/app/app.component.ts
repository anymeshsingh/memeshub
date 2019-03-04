import { Component } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreatePostComponent } from './pages/create-post/create-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public router: Router, public dialog: MatDialog){}
}
