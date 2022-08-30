import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateProductsComponent } from './update-products.component';

import { ToastrModule } from 'ngx-toastr';
import { Component } from '@angular/core';

describe('UpdateProductsComponent', () => {
  let component: UpdateProductsComponent;
  let fixture: ComponentFixture<UpdateProductsComponent>;

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
});
