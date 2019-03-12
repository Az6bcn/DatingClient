import { TestBed } from '@angular/core/testing';

import { UserDetailResolverService } from './user-detail-resolver.service';

describe('UserDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDetailResolverService = TestBed.get(UserDetailResolverService);
    expect(service).toBeTruthy();
  });
});
