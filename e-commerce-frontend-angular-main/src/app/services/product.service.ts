import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

interface Details {
  cartCount: number;
  products: {
    product: Product;
    quantity: number;
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl: string = '/api/product';

  private _details = new BehaviorSubject<Details>({
    cartCount: 0,
    products: [],
    totalPrice: 0.0,
  });

  private _cart$ = this._details.asObservable();

  getDetails(): Observable<Details> {
    return this._cart$;
  }

  setDetails(latestValue: Details) {
    return this._details.next(latestValue);
  }

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }
  z: number = 1;
  idPr: number = 1;
  NamePr: String = '';
  public Changer(z: number) {
    this.z = z;
  }
  public SearchMan(id: number) {
    this.idPr = id;
  }
  public SearchManName(name: String) {
    this.NamePr = name;
  }
  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      environment.baseUrl + this.productUrl + '/' + id,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      environment.baseUrl + this.productUrl + '/' + id,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
  public getProductsByName(name: String): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.baseUrl + this.productUrl + '/search/name/' + name,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
  public getProductsByAny(name: String): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.baseUrl + this.productUrl + '/search/any/' + name,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
  public getProductsByDesc(name: String): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.baseUrl + this.productUrl + '/search/description/' + name,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
  public updateProduct(product: Product) {
    return this.http.put(environment.baseUrl + this.productUrl, product, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  public createProduct(product: Product) {
    return this.http.post(environment.baseUrl + this.productUrl, product, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  public uploadProductImage(product_id: number, formData: FormData) {
    return this.http.put<any>(
      environment.baseUrl + '/api/product/image/' + product_id,
      formData,
      {
        headers: {
          'Access-Control-Allow-Origin':
            environment.headers['Access-Control-Allow-Origin'],
        },
        withCredentials: environment.withCredentials,
      }
    );
  }
  /*
  public uploadProductImageByName(Name: String, formData: FormData) {
    return this.http.put<any>(
      environment.baseUrl + '/api/product/image/' + Name,
      formData,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
  */
  public purchase(
    products: { id: number; quantity: number }[]
  ): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(
      environment.baseUrl + this.productUrl,
      payload,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
}
