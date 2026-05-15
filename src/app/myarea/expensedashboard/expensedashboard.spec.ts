import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Expensedashboard } from './expensedashboard';

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
});
