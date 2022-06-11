import { TestBed } from '@angular/core/testing';

import { JwttokenInterceptor } from './jwttoken.interceptor';

describe('JwttokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwttokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwttokenInterceptor = TestBed.inject(JwttokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
