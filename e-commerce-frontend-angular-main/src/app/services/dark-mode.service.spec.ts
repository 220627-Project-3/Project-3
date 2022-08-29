import { TestBed } from '@angular/core/testing';
import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let service: DarkModeService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method for changing the theme called toggleDarkTheme()', () => {
    //check the service for the toggle function
    expect(service.toggleDarkTheme).toMatch('toggleDarkTheme()');
  });

  it('should change the theme to "dark-theme" when called', () => {
    //toggle dark theme on
    service.toggleDarkTheme();
    //check for 'dark-theme' class in body tag
    expect(document.body.classList).toContain('dark-theme');
  });
  it('should change the theme to "light-theme" when called twice', () => {
    //toggle dark theme on
    service.toggleDarkTheme();
    //toggle it back off
    service.toggleDarkTheme();
    //check for 'dark-theme' class in body tag
    expect(document.body.classList).toMatch('');
  });
});
