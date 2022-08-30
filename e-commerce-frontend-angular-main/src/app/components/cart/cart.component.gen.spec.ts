import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartComponent } from './cart.component';
import { Product } from 'src/app/models/product';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockToastrService = jasmine.createSpyObj('ToastrService', [
    'info',
    'success',
    'error',
  ]);

  beforeEach(() => {
    const routerStub = () => ({});
    const toastrServiceStub = () => ({
      success: (string, string1) => ({}),
      info: (string, string1) => ({}),
    });

    let fakeGetCart = function () {};

    let fakeGetDetails = function () {
      return {
        cartCount: 0,
        products: [],
        totalPrice: 0.0,
      };
    };

    let fakeEmptyCart = function () {};

    const productServiceStub = () => ({
      initializeCart: () => ({}),
      getDetails: () => ({ subscribe: (f) => fakeGetDetails }),
      getCart: () => ({ subscribe: (f) => fakeGetCart }),
      emptyCart: (id) => ({ subscribe: (f) => fakeEmptyCart }),
      setDetails: (cart) => ({}),
      removeItem: (id, number, id1) => ({}),
      updateCartItem: (id, arg1, productid) => ({ subscribe: (f) => f({}) }),
    });
    const authServiceStub = () => ({
      getUser: () => ({ subscribe: () => ({ unsubscribe: () => ({}) }) }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CartComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: ProductService, useFactory: productServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
      ],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`products has default value`, () => {
    expect(component.products).toEqual([]);
  });

  it(`cartProducts has default value`, () => {
    expect(component.cartProducts).toEqual([]);
  });

  describe('headingToCheckout', () => {
    it('makes expected calls', () => {
      const toastrServiceStub: ToastrService =
        fixture.debugElement.injector.get(ToastrService);
      spyOn(toastrServiceStub, 'success').and.callThrough();
      component.headingToCheckout();
      expect(toastrServiceStub.success).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      let product: Product = {
        id: 1,
        name: 'name',
        quantity: 1,
        price: 1,
        description: 'description',
        image: 'image',
      };
      component.products = [
        {
          product: product,
          quantity: 1,
        },
      ];
      spyOn(productServiceStub, 'initializeCart').and.callThrough();
      spyOn(productServiceStub, 'getDetails').and.callThrough();
      spyOn(productServiceStub, 'getCart').and.callThrough();
      component.ngOnInit();
      expect(productServiceStub.initializeCart).toHaveBeenCalled();
      expect(productServiceStub.getDetails).toHaveBeenCalled();
      expect(productServiceStub.getCart).toHaveBeenCalled();
    });
  });

  describe('emptyCart', () => {
    it('makes expected calls', () => {
      const toastrServiceStub: ToastrService =
        fixture.debugElement.injector.get(ToastrService);
      const productServiceStub: ProductService =
        fixture.debugElement.injector.get(ProductService);
      interface Details {
        cartCount: number;
        products: {
          product: Product;
          quantity: number;
        }[];
        totalPrice: number;
      }
      let details: Details = {
        cartCount: 1,
        products: [],
        totalPrice: 1,
      };
      spyOn(toastrServiceStub, 'info').and.callThrough();
      spyOn(productServiceStub, 'emptyCart').and.callThrough();
      spyOn(productServiceStub, 'setDetails').and.callThrough();
      toastrServiceStub.info('test', 'test');
      productServiceStub.setDetails(details);
      component.emptyCart();
      expect(toastrServiceStub.info).toHaveBeenCalled();
      expect(productServiceStub.emptyCart).toHaveBeenCalled();
      expect(productServiceStub.setDetails).toHaveBeenCalled();
    });
  });
});
