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
}
