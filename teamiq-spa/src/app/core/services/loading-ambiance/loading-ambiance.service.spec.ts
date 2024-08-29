import { TestBed } from '@angular/core/testing';

import { LoadingAmbianceService } from './loading-ambiance.service';

describe('LoadingAmbianceService', () => {
  let service: LoadingAmbianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingAmbianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
