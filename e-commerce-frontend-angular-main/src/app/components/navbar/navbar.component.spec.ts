import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from 'src/app/services/product.service';
import {
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CookieModule, CookieService } from 'ngx-cookie';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CookieModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    service = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('Should Change the product.service',()=>{
  //   component.ChangeChange();
  //   // ChangeChange Changes z to 1 for the proper search
  //   expect(service.z==1).toBeTruthy();
  // })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Big search in case of an empty search should Change the z to 1 and run the default search which is search all', () => {
    component.Searching = '';
    component.BigSearch();
    expect(service.NamePr == '').toBeTruthy();
    expect(service.z == 1).toBeTruthy();
  });
  it('Big search should change z to 2 if we choose ID', () => {
    component.Searching = '1';
    component.searchByValue = 'Id';
    component.BigSearch();
    expect(service.idPr == 1).toBeTruthy();
    expect(service.z == 2).toBeTruthy();
  });
  it('Big search should change z to 3 if we choose Name', () => {
    component.Searching = 'Sableye';
    component.searchByValue = 'Name';
    component.BigSearch();
    expect(service.NamePr == 'Sableye').toBeTruthy();
    expect(service.z == 3).toBeTruthy();
  });
  it('Big search should change z to 5 if we choose Any', () => {
    component.Searching = 'Sableye';
    component.searchByValue = 'Any';
    component.BigSearch();
    expect(service.NamePr == 'Sableye').toBeTruthy();
    expect(service.z == 5).toBeTruthy();
  });
  it('Big search should change z to 4 if we choose Description', () => {
    component.Searching = 'Pokemon';
    component.searchByValue = 'Desc';
    component.BigSearch();
    expect(service.NamePr == 'Pokemon').toBeTruthy();
    expect(service.z == 4).toBeTruthy();
  });
  describe('SearchButtwithAny', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(productServiceStub, 'Changer').and.callThrough();
      spyOn(productServiceStub, 'SearchManName').and.callThrough();
      component.SearchButtwithAny();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(productServiceStub.Changer).toHaveBeenCalled();
      expect(productServiceStub.SearchManName).toHaveBeenCalled();
    });
  });

  describe('SearchButt', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(productServiceStub, 'Changer').and.callThrough();
      spyOn(productServiceStub, 'SearchMan').and.callThrough();
      component.SearchButt();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(productServiceStub.Changer).toHaveBeenCalled();
      expect(productServiceStub.SearchMan).toHaveBeenCalled();
    });
  });

  describe('SearchButtwithName', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(productServiceStub, 'Changer').and.callThrough();
      spyOn(productServiceStub, 'SearchManName').and.callThrough();
      component.SearchButtwithName();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(productServiceStub.Changer).toHaveBeenCalled();
      expect(productServiceStub.SearchManName).toHaveBeenCalled();
    });
  });

  describe('SearchButtwithDesc', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(productServiceStub, 'Changer').and.callThrough();
      spyOn(productServiceStub, 'SearchManName').and.callThrough();
      component.SearchButtwithDesc();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(productServiceStub.Changer).toHaveBeenCalled();
      expect(productServiceStub.SearchManName).toHaveBeenCalled();
    });
  });

  it(`value has default value`, () => {
    expect(component.value).toEqual(0);
  });

  it(`searchByValue has default value`, () => {
    expect(component.searchByValue).toEqual(`Any`);
  });

  describe('localDarkTheme', () => {
    it('makes expected calls', () => {
      const darkModeServiceStub: DarkModeService =
        fixture.debugElement.injector.get(DarkModeService);
      spyOn(darkModeServiceStub, 'toggleDarkTheme').and.callThrough();
      component.localDarkTheme();
      expect(darkModeServiceStub.toggleDarkTheme).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(productServiceStub, 'initializeCart').and.callThrough();
      spyOn(productServiceStub, 'getDetails').and.callThrough();
      component.ngOnInit();
      expect(productServiceStub.initializeCart).toHaveBeenCalled();
      expect(productServiceStub.getDetails).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService =
        fixture.debugElement.injector.get(AuthService);
      spyOn(authServiceStub, 'logout').and.callThrough();
      component.logout();
      expect(authServiceStub.logout).toHaveBeenCalled();
    });
  });
  describe('getCurrentUserInformation', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService =
        fixture.debugElement.injector.get(AuthService);
      const cookieServiceStub: CookieService =
        fixture.debugElement.injector.get(CookieService);
        cookieServiceStub.put('JSESSIONID','1234')
      spyOn(authServiceStub, 'getSession').and.callThrough();
      spyOn(cookieServiceStub, 'get').and.callThrough();
      component.getCurrentUserInformation();
      expect(authServiceStub.getSession).toHaveBeenCalled();
      expect(cookieServiceStub.get).toHaveBeenCalled();
    });
  });
});
