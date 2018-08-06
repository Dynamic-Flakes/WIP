import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  tempPassword;

  constructor(public fb: FormBuilder, public _authService: AuthService, public router: Router, public data: DataService) { }

  ngOnInit() {
    this.createForm();
  }

  login() {
    const userModel = {
      cooperId: this.loginForm.controls['cooperId'].value,
      password: this.loginForm.controls['password'].value
    };

    // Getting the Temporary Password for persistence purpose
    this.tempPassword = this.loginForm.controls['password'].value;

    console.log(userModel);
    this._authService.authenticateUser(userModel).subscribe(res => {
      console.log(res.data.token.token);
      console.log(res);
      if (res.success == true) {
        this._authService.storeUserData(res.data.token.token, res.data.user);

        // Sending Mongo Id and Temporary Password to Data Store
        const _id = res.data.user._id;
        const _pass = this.data.changeUserId(_id);
        this.data.changeUserPassword(this.tempPassword);

        // Navigating to Reset Password Page
        this.router.navigate(['/kyc/change-password']);

      } else {
      }
    }, (err) => {
      console.log(err);
      this.router.navigate(['/kyc/login']);
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      cooperId: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }

}
