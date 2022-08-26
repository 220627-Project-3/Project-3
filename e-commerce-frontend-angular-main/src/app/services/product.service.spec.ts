import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ProductService } from './product.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Product } from '../models/product';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';



describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
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
      httpMock = TestBed.inject(HttpTestingController);

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

  it('this Should also change but is Search man named :) :sableye:', () => {
    if(service.NamePr!="Sableye"){
      service.SearchManName("Sableye")
    }
    expect(service.NamePr=="Sableye").toBeTruthy();
  });
  it('this Should also change but is named Search man',()=>{
    if(service.idPr!=1){
      service.SearchMan(1);
    }
    expect(service.idPr==1).toBeTruthy();
  });

  it('get Product By Id',(done: DoneFn)=>{
    //this tests that the getProductById is a get request.
    httpSpy.get.and.nextWith(fakeProducts);
    httpSpy.get.and.returnValue(of(fakeProduct))
    service.getProductById(2).subscribe(
      Product=> {
        expect(Product.id).toEqual(2)
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  

  it('get Products By Name',(done: DoneFn)=>{
    //once again testing if the getProductByName is a get request which we knew it was.
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
  
