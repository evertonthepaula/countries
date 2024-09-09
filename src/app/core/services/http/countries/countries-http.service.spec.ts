import { TestBed } from '@angular/core/testing';

import { CountriesHttpService } from './countries-http.service';

describe('CountriesHttpService', () => {
  let service: CountriesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
