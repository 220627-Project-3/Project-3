import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let fakeRouter: jasmine.SpyObj<Router>;
  let fakeToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    fakeAuthService = jasmine.createSpyObj<AuthService>('AuthService', httpClientSpy);
    fakeRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    fakeToastr = jasmine.createSpyObj<ToastrService>('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent, NavbarComponent, FooterComponent],
      providers: [
        { provide: AuthService, useFactory: () => fakeAuthService },
        { provide: Router, useFactory: () => fakeRouter },
        { provide: ToastrService, useFactory: () => fakeToastr },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
