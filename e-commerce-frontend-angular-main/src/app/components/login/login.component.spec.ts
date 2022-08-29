import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [
      HttpClientTestingModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),
    ],
  }).compileComponents();
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (_array: any) => ({}) });
    const toastrServiceStub = () => ({
      success: (_string: any, _string1: any) => ({}),
      error: (_string: any, _string1: any) => ({}),
    });
    const authServiceStub = () => ({
      login: (_arg: any, _arg1: any) => ({
        subscribe: (f: (arg0: {}) => any) => ({}),
      }),
      loggedIn: {},
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showError has default value`, () => {
    expect(component.showError).toEqual(false);
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService =
        fixture.debugElement.injector.get(AuthService);
      spyOn(authServiceStub, 'login').and.callThrough();
      component.onSubmit();
      expect(authServiceStub.login).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.register();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
