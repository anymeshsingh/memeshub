import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/providers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  login:Boolean = true;
  signinForm: FormGroup;
  signupForm: FormGroup;

  constructor(public auth: AuthenticationService, public snackBar: MatSnackBar) {
    this.signinForm = this.createSigninFormGroup();
    this.signupForm = this.createSignupFormGroup();
  }

  revert() {
    this.signinForm.reset();
  }
  
  onSigninSubmit() {
    this.auth.signin(this.signinEmail.value, this.signinPassword.value)
    .catch((error)=>{
      this.errorSnackBar(error.message);
    });    
  }

  async onSignupSubmit() {
    // Check if Username provided at the time of signup is already present or not 
    this.auth.usernameAreadyPresent(this.signupUsername.value)
    .then((result)=>{
      if(result.exists){
        this.errorSnackBar("Username is already taken!");
      } else {
        this.auth.signup(this.signupEmail.value, this.signupPassword.value, this.signupUsername.value)
          .catch((error)=>{
            this.errorSnackBar(error.message);
      });
      }
    })
    .catch();
  }

  // Sign in Form Properties
  get signinEmail() {
    return this.signinForm.get('email');
  }
  get signinPassword() {
    return this.signinForm.get('password');
  }
  // Sign up Form Properties
  get signupEmail() {
    return this.signupForm.get('email');
  }
  get signupUsername() {
    return this.signupForm.get('username');
  }
  get signupPassword() {
    return this.signupForm.get('password');
  }


  // Sign in form builder
  createSigninFormGroup() {
    return new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
        ),
    });
  }
  // Sign up form builder
  createSignupFormGroup() {
    return new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ),
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
        ],
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      )
    });
  }

  // Twitter sign in method
  twitterSignin(){
    this.auth.twitterSignin()
    .catch((error)=>{
      this.errorSnackBar(error.message);
    });
  }
  // Facebook sign in method
  facebookSignin(){
    this.auth.facebookSignin()
    .catch((error)=>{
      this.errorSnackBar(error.message);
    });
  }
  // Google sign in method
  googleSignin(){
    this.auth.googleSignin()
    .catch((error)=>{
      this.errorSnackBar(error.message);
    });
  }

  errorSnackBar(message: string) {
    this.snackBar.open(message, null,{
      duration: 5000,
    });
  }

  // Page Toggle
  loginToggle(){
    if(this.login){
      this.login = false;
    } else{
      this.login = true;
    }
  }

}
