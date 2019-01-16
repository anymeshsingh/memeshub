import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { auth } from 'firebase';
import { Username } from '../models/username.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Logged in user state
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
      // Getting logged in user state
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else{
            return of(null);
          }
        })
      );
    }

    // Check if Username provided at the time of signup is already present or not 
    usernameAreadyPresent(username){
      let docRef: AngularFirestoreDocument<Username> = this.afs.collection("usernames").doc(username);
      return docRef.get().toPromise();
    }
    
    // Email and Password sign up method
    async signup(email, password, username){
      return await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result)=>{
        this.updateUserData(result.user, username);
      });
    }

    // Email and Password sign in method
    async signin(email: string, password: string){
      return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result)=>{
        this.router.navigate(['/memes']);
      });
    }

    // Twitter sign in method
    async twitterSignin(){
      const provider = new auth.TwitterAuthProvider();
      return await this.afAuth.auth.signInWithPopup(provider)
      .then((result)=>{
        this.updateUserData(result.user, null);
      });
    }

    // Facebook sign in method
    async facebookSignin(){
      const provider = new auth.FacebookAuthProvider();
      return await this.afAuth.auth.signInWithPopup(provider)
      .then((result)=>{
        this.updateUserData(result.user, null);
      });
    }

    // Google sign in method
    async googleSignin(){
      const provider = new auth.GoogleAuthProvider();
      return await this.afAuth.auth.signInWithPopup(provider)
      .then((result)=>{
        this.updateUserData(result.user, null);
      });
    }

    // Set/Update userdata on Firestore
    updateUserData(user, username){
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        username: username
      };
      userRef.set(data, { merge: true })
      .then((docRef)=>{
        // Document reference is accessable here
      })
      .catch(error=>{
        console.error("Error adding document: ", error);
      });

      if(username){
        const usernameRef: AngularFirestoreDocument<Username> = this.afs.doc(`usernames/${username}`);
        const usernamedata = {
          uid: user.uid,
          username: username,
        }
        usernameRef.set(usernamedata, { merge: true })
        .then()
        .catch(
          error=>{
            console.log(error.message);
          }
        )
      }
      this.router.navigate(['/memes']);
    }

    // Sign out method
    async signout(){
      await this.afAuth.auth.signOut();
      return this.router.navigate(['/']);
    }

}
