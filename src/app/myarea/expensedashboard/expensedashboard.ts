import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpDataService } from '../../services/httpdata.service';
import { ExpenseRecord, ExpenseRecordsResponse } from './expensedashboard.model';

@Component({
  selector: 'app-expensedashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expensedashboard.html',
  styleUrl: './expensedashboard.css',
})
export class Expensedashboard implements OnDestroy {
  private readonly httpDataService = inject(HttpDataService);
  private recordsSubscription: Subscription | null = null;
  readonly expenseRecords = signal<ExpenseRecord[]>([]);
  readonly expenseCount = signal(0);
  readonly statusCode = signal<number | null>(null);

  getexpenserecords(): void {
    this.recordsSubscription?.unsubscribe();
    this.recordsSubscription = this.httpDataService.getData<ExpenseRecordsResponse>('api/my-expenses').subscribe({
      next: (response) => {
        this.statusCode.set(response.statusCode);
        this.expenseCount.set(response.count);
        this.expenseRecords.set(response.data);
        console.log('Expense records fetched successfully:', response);
      },
      error: (error) => {
        this.statusCode.set(error.status ?? null);
        this.expenseCount.set(0);
        this.expenseRecords.set([]);
        console.error('Error fetching expense records:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.recordsSubscription?.unsubscribe();
  }
}
