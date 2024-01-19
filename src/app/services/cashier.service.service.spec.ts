import { TestBed } from '@angular/core/testing';

import { CashierServiceService } from './cashier.service.service';

describe('CashierServiceService', () => {
  let service: CashierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
