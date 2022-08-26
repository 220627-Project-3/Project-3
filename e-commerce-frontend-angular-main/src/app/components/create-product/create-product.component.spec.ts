import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
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
});
