import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Sharedstate } from '../../services/sharedstate';
import { HttpDataService } from '../../services/httpdata.service';

@Component({
  selector: 'app-myexpnses',
  standalone: true,
  templateUrl: './myexpnses.component.html',
  styleUrl: './myexpnses.component.css',
  imports: [ReactiveFormsModule]
})
export class MyexpnsesComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  sharedState = inject(Sharedstate);
  private subscription: Subscription | null = null;
  readonly paidFromOptions = ['UPI', 'Cash', 'Card', 'Bank Transfer','Amazon Paylater'];
  private readonly today = new Date().toISOString().split('T')[0];

  readonly expenseForm = this.formBuilder.nonNullable.group({
    expenseName: ['', Validators.required],
    expenseAmount: [0, [Validators.required, Validators.min(1)]],
    paidFrom: ['UPI', Validators.required],
    expenseDate: [this.today, Validators.required]
  });
  loggedInEmail = this.sharedState.initNameFromEmail();
  httpDataService = inject(HttpDataService);
  showSuccessMessage = signal<boolean>(false);
  ngOnInit() {
    // Initialization logic if needed
  }

  onSubmit() {
    const reqPayload = {
      expenseName: this.expenseForm.get('expenseName')?.value,
      amount: this.expenseForm.get('expenseAmount')?.value,
      paidFrom: this.expenseForm.get('paidFrom')?.value,
      date: this.expenseForm.get('expenseDate')?.value
    }
    this.subscription = this.httpDataService.postData('api/save-expense', reqPayload).subscribe({
      next: (response) => {
        console.log('Expense added successfully:', response);
        this.showSuccessMessage.set(true);
        this.expenseForm.reset({
          expenseName: '',
          expenseAmount: 0,
          paidFrom: 'UPI',
          expenseDate: this.today
        });
        setTimeout(() => {
          this.showSuccessMessage.set(false);
        }, 5000);
      },
      error: (error) => {
        console.error('Error adding expense:', error);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closeSuccessMsg(){
    this.showSuccessMessage.set(false);
  }
}
