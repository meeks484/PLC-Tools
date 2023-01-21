import { TestBed } from '@angular/core/testing';

import { Binary } from './Binary';

describe('BitTypeConversionService', () => {
  let service: Binary;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Binary);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
