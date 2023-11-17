import { TestBed } from '@angular/core/testing';

import { SupabaseserviceService } from './supabaseservice.service';

describe('SupabaseserviceService', () => {
  let service: SupabaseserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
