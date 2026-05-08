import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sharedstate } from '../../services/sharedstate';

@Component({
  selector: 'app-myexpnses',
  standalone: true,
  templateUrl: './myexpnses.component.html',
  styleUrl: './myexpnses.component.css',
  imports: [ReactiveFormsModule]
})
export class MyexpnsesComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  sharedState = inject(Sharedstate);
  readonly paidFromOptions = ['UPI', 'Cash', 'Card', 'Bank Transfer'];

  readonly expenseForm = this.formBuilder.nonNullable.group({
    expenseName: ['', Validators.required],
    paidFrom: ['UPI', Validators.required],
    expenseDate: ['', Validators.required]
  });
  loggedInEmail = this.sharedState.initNameFromEmail();

  ngOnInit() {
    // Initialization logic if needed
  }

  onSubmit() {
    console.log(this.expenseForm.getRawValue());
  }
}
