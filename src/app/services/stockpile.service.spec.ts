import { TestBed } from '@angular/core/testing';

import { StockpileService } from './stockpile.service';

describe('StockpileService', () => {
  let service: StockpileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockpileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
