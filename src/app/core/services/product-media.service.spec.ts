import { TestBed } from '@angular/core/testing';

import { ProductMediaService } from './product-media.service';

describe('ProductMediaService', () => {
  let service: ProductMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
