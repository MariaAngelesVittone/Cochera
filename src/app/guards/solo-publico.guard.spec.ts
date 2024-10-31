import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { soloPublicoGuard } from './solo-publico.guard';

describe('soloPublicoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => soloPublicoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
