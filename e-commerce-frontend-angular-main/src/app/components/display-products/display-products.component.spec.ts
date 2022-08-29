import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';

import { DisplayProductsComponent } from './display-products.component';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{provide: ProductService, useValue: mockProductService}]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // mockProductService.getProducts
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Integration testing
  it('should return', () => {
    let value = mockProductService.getProducts.and.returnValue(
      {data: 'somevalue'}
    );
    expect(value).toBeTruthy();
  })
});
