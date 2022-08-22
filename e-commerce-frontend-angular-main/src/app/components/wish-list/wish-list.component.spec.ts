import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { WishListComponent } from './wish-list.component';

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishListComponent ],imports: [ HttpClientTestingModule, RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule  ]
    })
    .compileComponents();
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
    component.removeFromWishList(1);
    expect(component["toastr"].info).toHaveBeenCalled();
  });
});
