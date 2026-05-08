import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpDataService } from '../services/httpdata.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { OtpInputComponent } from '../shared/otp-input/otp-input.component';
import { Router } from '@angular/router';
import { Sharedstate } from '../services/sharedstate';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, OtpInputComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  private httpDataService = inject(HttpDataService);
  private subscriptions: Subscription[] = [];
  envName = environment.envName; // Fetch envName from environment
  email = '';
  otp = '';
  showOtpInput = signal(false);
  router = inject(Router);
  submitEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log('Submitted email:', this.email);

    const subscription = this.httpDataService.postData('api/send-otp', { email: this.email }).subscribe({
      next: (response) => {
        console.log('OTP sent successfully:', response);
        this.showOtpInput.set(true);
        // form.resetForm();
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
      }
    });
    this.subscriptions.push(subscription);

  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }
sharedstate = inject(Sharedstate);
  onOtpSubmit(otp: string) {
        // write logic to navigate to myarea or dashboard after successful OTP verification
        this.router.navigate(['/myarea']);
    this.otp = otp;
    const subscription = this.httpDataService.postData('api/verify-otp', { email: this.email, otp: this.otp }).subscribe({
      next: (response) => {
        console.log('OTP verified successfully:', response);
        this.sharedstate.setLoggedInEmail(this.email);
        // write logic to navigate to myarea or dashboard after successful OTP verification
        this.router.navigate(['/myarea']);
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
      }
    });
    this.subscriptions.push(subscription);
  }

  sayHello() {
    const subscription = this.httpDataService.getData('api/hello').subscribe({
      next: (response) => {
        console.log('ok..', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
    this.subscriptions.push(subscription);
  }

  //Dirctly calling azure function without going through node server
  callAzureFunction() {
    const subscription = this.httpDataService.getAzureFunctionData().subscribe({
      next: (response) => {
        console.log('ok azure..', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
    this.subscriptions.push(subscription);
  }

  callNodeAzureFn() {
    const subscription = this.httpDataService.getData('api/callazurefn').subscribe({
      next: (response) => {
        console.log('ok azure from node..', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
