import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WishListService } from './wish-list.service';

describe('WishListService', () => {
  let service: WishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule]});
    service = TestBed.inject(WishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
