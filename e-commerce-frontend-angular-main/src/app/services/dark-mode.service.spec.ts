import { TestBed } from '@angular/core/testing';

import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let service: DarkModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#toggleDarkTheme should change the theme', () => {
    expect(service.toggleDarkTheme).toBeTruthy;
  });
});
