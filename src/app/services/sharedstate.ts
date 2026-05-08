import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sharedstate {
  loggedinEmail =signal<string>('');
  initNameFromEmail = computed(() => this.loggedinEmail().split('@')[0]);

  constructor() { }

  setLoggedInEmail(email: string) {
    this.loggedinEmail.set(email);
  }
}
