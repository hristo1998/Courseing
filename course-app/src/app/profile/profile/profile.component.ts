import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../core/models/user.interface';
import { Router } from '@angular/router';

// import {FormValidators} from '../validators/form.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  errorMessage: string;

  user: User;

  oldPassword: string
  newPassword: string
  repeatPassword: string

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser()
    console.log(this.user)
  }

  changeName() {
    this.updateUser()
  }

  changePassword() {
    if (this.oldPassword !== this.user.password) {
      this.errorMessage = "Invalid password"
      return
    }

    if (this.newPassword != this.repeatPassword) {
      this.errorMessage = "Passwords dont match"
      return
    }

    this.user.password = this.newPassword
    this.user.rePassword = this.newPassword
    this.updateUser()
  }

  updateUser(){
    this.authService.updateUser(this.user).pipe(
      takeUntil(this.destroy$)
    ).subscribe(_ => this.authService.setLoggedUser(this.user));
  }
}
