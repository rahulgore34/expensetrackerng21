import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpDataService } from '../services/httpdata.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private httpDataService = inject(HttpDataService);
  envName = environment.envName; // Fetch envName from environment

  sayHello() {
    this.httpDataService.getData('api/hello').subscribe({
      next: (response) => {
        console.log('ok..',response)
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }

  callAzureFunction() {
    console.log('Call Azure Function button clicked');
    // Add logic to call the Azure function here
  }
}
