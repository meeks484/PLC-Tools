import { TestBed } from '@angular/core/testing';

import { BitTypeConversionService } from './bit-type-conversion.service';

describe('BitTypeConversionService', () => {
  let service: BitTypeConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitTypeConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
