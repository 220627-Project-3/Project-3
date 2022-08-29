import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from 'src/app/services/product.service';
import { ComponentRef } from '@angular/core';
import { CookieModule } from 'ngx-cookie';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ], imports: [ HttpClientTestingModule, RouterTestingModule, CookieModule.forRoot() ]
    })

    .compileComponents();
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
    component.Searching="";
    component.BigSearch();
    expect(service.NamePr=="").toBeTruthy();
    expect(service.z==1).toBeTruthy();
  });
  it('Big search should change z to 2 if we choose ID', () => {
    component.Searching="1";
    component.searchByValue="Id"
    component.BigSearch();
    expect(service.idPr==1).toBeTruthy();
    expect(service.z==2).toBeTruthy();
  });
  it('Big search should change z to 3 if we choose Name', () => {
    component.Searching="Sableye";
    component.searchByValue="Name"
    component.BigSearch();
    expect(service.NamePr=="Sableye").toBeTruthy();
    expect(service.z==3).toBeTruthy();
  });
  it('Big search should change z to 5 if we choose Any', () => {
    component.Searching="Sableye";
    component.searchByValue="Any"
    component.BigSearch();
    expect(service.NamePr=="Sableye").toBeTruthy();
    expect(service.z==5).toBeTruthy();
  });
  it('Big search should change z to 4 if we choose Description', () => {
    component.Searching="Pokemon";
    component.searchByValue="Desc"
    component.BigSearch();
    expect(service.NamePr=="Pokemon").toBeTruthy();
    expect(service.z==4).toBeTruthy();
  });

});
