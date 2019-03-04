import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
})
export class MaterialModule { }