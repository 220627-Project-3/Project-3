import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';




describe('ProductService', () => {
  let service: ProductService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule ]});
    
    service = TestBed.inject(ProductService);
    
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
  it('get Product By Id',()=>{
      let z =service.getProductById(1);
    
    expect(z).toBeTruthy();
  });

  it('get Products By Name',()=>{
    let z =service.getProductsByName("sneak");
  
  expect(z).toBeTruthy();
});
  
});
