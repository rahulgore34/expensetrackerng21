import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { HttpDataService } from '../../services/httpdata.service';
import { TableColumn, TableComponent } from '../../shared/components/table/table.component';
import { CardComponent } from '../../shared/layout/card/card.component';
import { ToolbarComponent } from '../../shared/layout/toolbar/toolbar.component';
import { ExpenseRecord, ExpenseRecordsResponse, ExpenseSummary } from './expensedashboard.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-expensedashboard',
  standalone: true,
  imports: [RouterLink, TableComponent, ToolbarComponent, CardComponent,CurrencyPipe],
  templateUrl: './expensedashboard.html',
  styleUrl: './expensedashboard.css',
})
export class Expensedashboard implements OnDestroy, OnInit {
  private readonly httpDataService = inject(HttpDataService);
  private recordsSubscription: Subscription | null = null;
  readonly toolbarTitle = 'Expense Dashboard';
  readonly toolbarSubtitle = 'Fetch and review your saved expenses from one place.';
  readonly expenseTableColumns: readonly TableColumn[] = [
    { key: 'expenseName', header: 'Expense Name' },
    { key: 'amount', header: 'Amount' },
    { key: 'paidFrom', header: 'Paid From' },
    { key: 'date', header: 'Date' },
  ];
  readonly expenseRecords = signal<ExpenseRecord[]>([]);
  readonly expenseCount = signal(0);
  readonly statusCode = signal<number | null>(null);
  readonly expenseSummary = signal<ExpenseSummary | null>(null);

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
    this.summaryApiSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    const myExpenseSummary = this.httpDataService.getData<ExpenseSummary>('api/my-expense-summary');
    const monthlyExpenseSummary = this.httpDataService.getData<ExpenseSummary>('api/monthly-expense-summary');
    this.summaryApiSubscription = forkJoin({
      summary: myExpenseSummary,
      monthly: monthlyExpenseSummary
    }).subscribe({
        next: ({ summary, monthly }: { summary: ExpenseSummary; monthly: ExpenseSummary }) => {
        console.log('My Expense Summary:', summary);
        this.expenseSummary.set(summary);
        console.log('Monthly Expense Summary:', this.expenseSummary());
      },
      error: (error) => {
        console.error('Error fetching summary data:', error);
      }
    });


  }
  summaryApiSubscription: Subscription | null = null;
}
// monthly-expense-summary
// /my-expense-summary
