import { TestBed } from '@angular/core/testing';
import * as exp from 'constants';

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

  it('should have a method for changing the theme', () => {
    expect(service.toggleDarkTheme).toBeTruthy;
  });
});
