import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Product } from '../models/product';



describe('ProductService', () => {
  let service: ProductService;
  let httpSpy: Spy<HttpClient>;
  let fakeProduct: Product =
    {
      id: 2,
      name: "Fake Product",
      quantity: 100,
      price: 10,
      description:"I am Fake",
      image:"fake"
    };
  let fakeProducts: Product[]=[{
    id: 1,
    name: "Fake Product",
    quantity: 100,
    price: 10,
    description:"I am Fake",
    image:"fake"
  },{
    id: 2,
    name: "Faker Product",
    quantity: 189,
    price: 3.50,
    description:"I am Faker",
    image:"fake"
  }];
    
  
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule ],providers: [
      ProductService,
      { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
    ]
  });
      service = TestBed.inject(ProductService);
      httpSpy = TestBed.inject<any>(HttpClient);
});
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should change', () => {
    if(service.z!=2){
      service.Changer(2)
    }
    expect(service.z==2).toBeTruthy();
  });
  it('this Should also change but is named Search man',()=>{
    if(service.idPr!=1){
      service.SearchMan(1);
    }
    expect(service.idPr==1).toBeTruthy();
  });

  it('get Products By Id',(done: DoneFn)=>{
    httpSpy.get.and.nextWith(fakeProduct);
    service.getProductById(2).subscribe(
      Product => {
        expect(Product.id).toEqual(fakeProduct.id);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('get Products By Name',(done: DoneFn)=>{
    httpSpy.get.and.nextWith(fakeProducts);
    service.getProductsByName("Fake Product").subscribe(
      Products => {
        expect(Products).toHaveSize(fakeProducts.length);
        expect(Products[1].name).toEqual(fakeProducts[1].name);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  
});
  
