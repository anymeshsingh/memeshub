import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule
  ],
})
export class MaterialModule { }