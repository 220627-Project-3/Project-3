import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

interface Details {
  cartCount: number;
  products: {
    product: Product;
    quantity: number;
  }[];
  totalPrice: number;
}

interface Products {
  id: number;
  product: Product;
  user: User;
  quantity: number;
}



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false,
  };

  private cartUrl: string = '/api/cart';
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

  async initializeCart() {
    console.log("Getting Set up");
    let LOG = this.as.getSession().subscribe((user: any) => {
      let productsObservable = this.http.get<Products[]>("http://localhost:8080/api/cart/" + user.id, environment);

      let products: {
        product: Product,
        quantity: number
      }[] = [];

      productsObservable.subscribe((data: Products[]) =>
        data.forEach(e => {
          products.push(
            {
              product: e.product,
              quantity: e.quantity
            }
          );
          let count = 0;
          let totalPrice = 0;
          for (let i = 0; i < products.length; i = i + 1) {
            count = count + products[i].quantity;
            totalPrice = totalPrice + products[i].quantity * products[i].product.price;
          }
          totalPrice = + Number(totalPrice).toFixed(2);
          let cart = {
            cartCount: count,
            products: products,
            totalPrice: totalPrice
          };
          this.setDetails(cart);
        }
        ));

    });
  }


  addToCart(product: Product): Observable<any> {
    //   console.log("hey there");
    //   this.as.getSession().subscribe((user: User) => {
    //     console.log(user.id);
    //     console.log(product.id);


    // });
    return this.http.post<any>(environment.baseUrl + this.cartUrl + '/' + 1, { productId: product.id }, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }


  getCart(): Observable<Details> {
    return this._cart$;
  }

  setDetails(latestValue: Details) {
    return this._details.next(latestValue);
  }

  constructor(
    private http: HttpClient,
    private as: AuthService
  ) { }

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

  // public emptyCart(userId: number){
  //   this._cart.subscribe(e => {
  //     e.products.forEach(product => {
  //       return this.http.put<any>(environment.baseUrl + this.cartUrl + '/' + userId, 
  //       {
  //         quantity: product.quantity,
  //         productId: product.product.quantity
  //       },
  //       {
  //         headers: environment.headers,
  //         withCredentials: environment.withCredentials,
  //       })
  //     })
  //   })
  // }

  public removeItem(userId: number, qty: number, prod: number): Observable<any> {
    console.log("removing " + qty + " from id " + prod);
    return this.http.put<any>(environment.baseUrl + this.cartUrl + '/' + userId,
      {
        quantity: qty,
        productId: prod
      },
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      })
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
