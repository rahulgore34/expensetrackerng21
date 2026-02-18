import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {


  constructor() {
    console.log('Hello ',environment.envName)

   }
}
