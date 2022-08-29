import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartComponent } from './cart.component';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockToastrService = jasmine.createSpyObj('ToastrService', [
    'info',
    'success',
    'error',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ToastrService, useValue: mockToastrService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display toastr message when cart is empty', () => {
  //   component.emptyCart();
  //   expect(component['toastr'].info).toHaveBeenCalled();
  // });
  it('should display toastr message when heading to checkout', () => {
    component.headingToCheckout();
    expect(component['toastr'].success).toHaveBeenCalled();
  });
});
