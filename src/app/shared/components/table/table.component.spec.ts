import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Name' },
      { key: 'amount', header: 'Amount' },
    ]);
    fixture.componentRef.setInput('rows', [{ name: 'Groceries', amount: 120 }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render generic table data from inputs', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    expect(nativeElement.textContent).toContain('Name');
    expect(nativeElement.textContent).toContain('Amount');
    expect(nativeElement.textContent).toContain('Groceries');
    expect(nativeElement.textContent).toContain('120');
  });
});
