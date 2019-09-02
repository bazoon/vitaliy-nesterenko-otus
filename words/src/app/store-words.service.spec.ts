import { TestBed } from '@angular/core/testing';

import { StoreWordsService } from './store-words.service';

describe('StoreWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreWordsService = TestBed.get(StoreWordsService);
    expect(service).toBeTruthy();
  });
});
