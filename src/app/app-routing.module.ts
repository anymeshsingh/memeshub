import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MemesComponent } from './pages/memes/memes.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AlreadySignedinGuard } from './guards/already-signedin.guard';

const routes: Routes = [
  {
    path: "", component: LoginComponent, canActivate: [AlreadySignedinGuard]
  },
  {
    path: "memes", component: MemesComponent, canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
