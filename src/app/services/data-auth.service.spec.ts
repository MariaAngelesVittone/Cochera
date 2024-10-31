import { TestBed } from '@angular/core/testing';

import { DataAuthService } from './data-auth.service';

describe('DataAuthService', () => {
  let service: DataAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
