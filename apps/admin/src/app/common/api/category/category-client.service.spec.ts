import { TestBed } from '@angular/core/testing';

import { CategoryClient } from './category-client.service';

describe('CategoryClient', () => {
  let service: CategoryClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
