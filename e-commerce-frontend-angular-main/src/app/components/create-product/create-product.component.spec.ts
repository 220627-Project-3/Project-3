import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

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
      declarations: [CreateProductComponent, MockNavComponent, MockFooterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
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

  it(`imagePreviewUrl has default value`, () => {
    expect(component.imagePreviewUrl).toEqual(
      `assets/images/default-product-image.png`
    );
  });

  it(`showConfirmUpload has default value`, () => {
    expect(component.showConfirmUpload).toEqual(false);
  });
});
