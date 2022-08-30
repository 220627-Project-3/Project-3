import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`loggedIn has default value`, () => {
    expect(service.loggedIn).toEqual(false);
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.logout().subscribe((res) => {
        expect(res).toEqual('null');
      });
      let authUrl = service.authUrl;
      const req = httpTestingController.expectOne(`${authUrl}/logout`);
      expect(req.request.method).toEqual('POST');
      httpTestingController.verify();
    });
  });
});
