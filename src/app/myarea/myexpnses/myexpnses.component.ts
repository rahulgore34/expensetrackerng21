import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-myexpnses',
  standalone: true,
  templateUrl: './myexpnses.component.html',
  styleUrl: './myexpnses.component.css',
  imports: [ReactiveFormsModule]
})
export class MyexpnsesComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly paidFromOptions = ['UPI', 'Cash', 'Card', 'Bank Transfer'];

  readonly expenseForm = this.formBuilder.nonNullable.group({
    expenseName: ['', Validators.required],
    paidFrom: ['UPI', Validators.required],
    expenseDate: ['', Validators.required]
  });
}
