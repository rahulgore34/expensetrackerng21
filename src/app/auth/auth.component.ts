import { Component, inject, OnDestroy } from '@angular/core';
import { HttpDataService } from '../services/httpdata.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  private httpDataService = inject(HttpDataService);
  private subscriptions: Subscription[] = [];
  envName = environment.envName; // Fetch envName from environment

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
