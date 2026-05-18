import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Expensedashboard } from './expensedashboard';
import { TableComponent } from '../../shared/components/table/table.component';

describe('Expensedashboard', () => {
  let component: Expensedashboard;
  let fixture: ComponentFixture<Expensedashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expensedashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Expensedashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should configure shared table columns for expense records', () => {
    expect(component.expenseTableColumns).toEqual([
      { key: 'expenseName', header: 'Expense Name' },
      { key: 'amount', header: 'Amount' },
      { key: 'paidFrom', header: 'Paid From' },
      { key: 'date', header: 'Date' },
    ]);
  });

  it('should render the shared table when records exist', async () => {
    component.expenseRecords.set([
      {
        expenseName: 'Internet Bill',
        amount: 999,
        paidFrom: 'UPI',
        date: '2026-05-18',
      },
    ]);
    component.statusCode.set(200);
    fixture.detectChanges();
    await fixture.whenStable();

    const tableComponent = fixture.debugElement.query(By.directive(TableComponent));

    expect(tableComponent).not.toBeNull();
  });
});
