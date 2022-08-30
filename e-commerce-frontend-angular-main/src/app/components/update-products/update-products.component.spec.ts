import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateProductsComponent } from './update-products.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('UpdateProductsComponent', () => {
  let component: UpdateProductsComponent;
  let fixture: ComponentFixture<UpdateProductsComponent>;
  let productService: ProductService;

  @Component({
    selector: 'app-navbar',
    template: '',
  })
  class MockNavComponent {}

  @Component({
    selector: 'app-footer',
    template: '',
  })
  class MockFooterComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UpdateProductsComponent,
        MockNavComponent,
        MockFooterComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`environment has default value`, () => {
    expect(component.environment).toEqual(environment);
  });

  it(`showError has default value`, () => {
    expect(component.showError).toEqual(false);
  });

  it(`showSuccess has default value`, () => {
    expect(component.showSuccess).toEqual(false);
  });

  it(`showLoading has default value`, () => {
    expect(component.showLoading).toEqual(false);
  });

  it(`showLoadingImage has default value`, () => {
    expect(component.showLoadingImage).toEqual(false);
  });

  it(`imagePreviewUrl has default value`, () => {
    expect(component.imagePreviewUrl).toEqual(
      `/assets/images/default-product-image.png`
    );
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'retrieveProductData').and.callThrough();
      component.ngOnInit();
      expect(component.retrieveProductData).toHaveBeenCalled();
    });
  });

  describe('retrieveProductData', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(productServiceStub, 'getProductById').and.callThrough();
      component.retrieveProductData("1");
      expect(productServiceStub.getProductById).toHaveBeenCalled();
    });
  });

  describe('submitProductImage', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(productServiceStub, 'uploadProductImage').and.callThrough();
      component.submitProductImage();
      expect(productServiceStub.uploadProductImage).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      spyOn(productServiceStub, 'deleteProduct').and.callThrough();
      component.deleteProduct();
      expect(productServiceStub.deleteProduct).toHaveBeenCalled();
    });
  });

});
