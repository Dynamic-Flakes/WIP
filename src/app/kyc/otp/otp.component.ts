import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const jquery: any;
declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit, AfterViewInit {
  verifyOtpForm;
  id;
  userId;
  concatUserInput;
  otp;
  sent = false; //Control for Resending OTP

  constructor(public fb: FormBuilder, public _authService: AuthService, public data: DataService, public router: Router) { }

  ngOnInit() {
    this.createForm();
    this.data.currentUserId.subscribe(id => this.userId = id);
    this.data.currentOtp.subscribe(otp => this.otp = otp);
    console.log('Id:' + this.userId);
    console.log('Otp:' + this.otp);
  }

  ngAfterViewInit() {
    $(".inputs").keyup(function () {
      if (this.value.length == this.maxLength) {
        $(this).next('.inputs').focus();
      }
    });
  }

  resendOtp() {
    this._authService.getOtp(this.userId).subscribe(res => {
      console.log('OTP: ' + res.data.otp)
      // SENDING OTP FOUND TO DATA STORE
      if (res.success == true) {
        this.data.changeOtp(res.data.otp);
        // RESEND OTP CONTROL 
        setTimeout(() => {
          this.sent = true;
        }, 2000);
        setTimeout(() => {
          this.sent = false;
        }, 3000);
      }
    });
  }

  verifyOtp() {
    const _one = this.verifyOtpForm.controls['one'].value;
    const _two = this.verifyOtpForm.controls['two'].value;
    const _three = this.verifyOtpForm.controls['three'].value;
    const _four = this.verifyOtpForm.controls['four'].value;
    const _five = this.verifyOtpForm.controls['five'].value;
    const _six = this.verifyOtpForm.controls['six'].value;
    this.concatUserInput = _one + _two + _three + _four + _five + _six;
    console.log('User entered this Otp: ' + this.concatUserInput);
    console.log(this.userId);

    if (this.userId != 'No Id' && this.otp != 'No Otp') {
      if (this.concatUserInput == this.otp) {
        this._authService.verifyOtp(this.concatUserInput, this.userId).subscribe(res => {
          console.log(res);
          console.log('BINGO!!!');
          this.router.navigate(['/kyc/transaction-pin']);
        }
        );

      } else {
        console.log('Wrong Otp Supplied, Try again!');
        this.router.navigate(['/kyc/otp']);
      }
    } else {
      console.log('Wrong Otp and UserId Found!');
      this.router.navigate(['/kyc/login']);
      this._authService.logout();
    }
  }

  createForm() {
    this.verifyOtpForm = this.fb.group({
      one: this.fb.control('', [Validators.required]),
      two: this.fb.control('', [Validators.required]),
      three: this.fb.control('', [Validators.required]),
      four: this.fb.control('', [Validators.required]),
      five: this.fb.control('', [Validators.required]),
      six: this.fb.control('', [Validators.required])
    });
  }

}