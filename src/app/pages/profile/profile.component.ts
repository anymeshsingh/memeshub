import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateForm: FormGroup;
  editPage: boolean = true;

  constructor(public auth: AuthenticationService, private snackBar: MatSnackBar) {
    this.updateForm = this.createUpdateFormGroup();
  }

  ngOnInit() {
  }

  onUpdateSubmit(){
    if(this.updateDisplayName.value || this.updateEmail.value || this.updateUsername.value) {
      if(this.updateUsername.value) {
        this.auth.usernameAreadyPresent(this.updateUsername.value)
        .then((result)=>{
          if(result.exists){
            this.errorSnackBar("Username is already taken!");
          } else {
            this.auth.updateDetails(this.updateDisplayName.value, this.updateEmail.value, this.updateUsername.value);
            this.editPage = !this.editPage;
          }
        })
        .catch(err=>{
          this.errorSnackBar(err.message);
        });
      }else {
        this.auth.updateDetails(this.updateDisplayName.value, this.updateEmail.value, null)
        this.editPage = !this.editPage;
      }
    } else {
      this.editPage = !this.editPage;
    }
  }

  get updateUsername() {
    return this.updateForm.get('username');
  }
  get updateDisplayName() {
    return this.updateForm.get('displayName');
  }
  get updateEmail() {
    return this.updateForm.get('email');
  }

  createUpdateFormGroup() {
    return new FormGroup({
      email:new FormControl(
        '',
        [
          Validators.email,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ),
      username: new FormControl(
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
        ],
      ),
      displayName: new FormControl(
        '',
        [
          Validators.minLength(10),
        ],
      )
    });
  }

  errorSnackBar(message: string) {
    this.snackBar.open(message, null,{
      duration: 5000,
    });
  }

}
