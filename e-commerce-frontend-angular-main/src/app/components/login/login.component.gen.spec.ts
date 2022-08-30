// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/services/auth.service';
// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(() => {
//     const routerStub = () => ({ navigate: (array: any) => ({}) });
//     const toastrServiceStub = () => ({
//       success: (string: any, string1: any) => ({}),
//       error: (string: any, string1: any) => ({})
//     });

//     let subscribeAuthService = () => {};

//     const authServiceStub = () => ({
//       login: (arg: any, arg1: any) => ({ subscribe: subscribeAuthService }),
//       loggedIn: {}
//     });
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [LoginComponent],
//       providers: [
//         { provide: Router, useFactory: routerStub },
//         { provide: ToastrService, useFactory: toastrServiceStub },
//         { provide: AuthService, useFactory: authServiceStub }
//       ]
//     });
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`showError has default value`, () => {
//     expect(component.showError).toEqual(false);
//   });

//   describe('onSubmit', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
//         ToastrService
//       );
//       const authServiceStub: AuthService = fixture.debugElement.injector.get(
//         AuthService
//       );
//       spyOn(routerStub, 'navigate').and.callThrough();
//       spyOn(toastrServiceStub, 'success').and.callThrough();
//       spyOn(toastrServiceStub, 'error').and.callThrough();
//       spyOn(authServiceStub, 'login').and.callThrough();
//       component.onSubmit();
//       expect(routerStub.navigate).toHaveBeenCalled();
//       expect(toastrServiceStub.success).toHaveBeenCalled();
//       expect(toastrServiceStub.error).toHaveBeenCalled();
//       expect(authServiceStub.login).toHaveBeenCalled();
//     });
//   });

//   describe('register', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       spyOn(routerStub, 'navigate').and.callThrough();
//       component.register();
//       expect(routerStub.navigate).toHaveBeenCalled();
//     });
//   });
// });
