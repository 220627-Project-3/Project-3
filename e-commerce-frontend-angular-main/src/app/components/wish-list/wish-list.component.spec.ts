import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { WishListService } from 'src/app/services/wish-list.service';

import { WishListComponent } from './wish-list.component';

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;
  let mockToastrService = jasmine.createSpyObj('ToastrService', [
    'error',
    'success',
  ]);
  let mockWishListService = jasmine.createSpyObj('WishListService', [
    'deleteItemFromWishlist',
    'getWishlist',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: WishListService, useValue: mockWishListService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display toastr message when wishlist item is removed', () => {
    mockWishListService.deleteItemFromWishlist.and.returnValue({
      subscribe: () => {
        mockToastrService.success();
      },
    });
    component.removeFromWishList(1);

    expect(component['toastr'].success).toHaveBeenCalled();
  });

  it('should successfully get user wishlist', () => {
    mockWishListService.getWishlist.and.returnValue({ subscribe: () => {} });
    component.addToWishList(1);
    expect(component['ws'].getWishlist).toHaveBeenCalled();
  });

  it('should display toastr message when wishlist item is added to cart', () => {
    let product: Product = {
      id: 0,
      name: 'test',
      quantity: 0,
      price: 0,
      description: 'test',
      image: 'test',
    };
    component.addToCart(product);
    expect(component['toastr'].success).toHaveBeenCalled();
  });
});
