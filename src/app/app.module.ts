import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Module to import Material Components
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFileUpload, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';

// Custom Services and Guards
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationService } from './providers/authentication.service';
import { FirestoreService } from './providers/firestore.service';


//Custom components
import { LoginComponent } from './pages/login/login.component';
import { MemesComponent } from './pages/memes/memes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { NavbarComponent } from './components/navbar/navbar.component';

library.add(faTwitter,faFacebookF, faGoogle, faFileUpload, faPlus, faBars);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemesComponent,
    ProfileComponent,
    CreatePostComponent,
    DropzoneDirective,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'Memeshub'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    InfiniteScrollModule
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }