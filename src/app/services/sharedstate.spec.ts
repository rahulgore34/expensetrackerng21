import { TestBed } from '@angular/core/testing';

import { Sharedstate } from './sharedstate';

describe('Sharedstate', () => {
  let service: Sharedstate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sharedstate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
