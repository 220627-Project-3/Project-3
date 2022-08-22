import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service'
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  cartCount!: number;
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  environment = environment;
  user?: User;

  @Input() productInfo!: Product;

  constructor(
    private productService: ProductService,
    private _authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe({
      next: (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Received data from parent component');
      },
    });
    this._authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Retrieved user info from card component")
      }
    });
  }

  addToCart(product: Product): void {
    
    
    let inCart = false;

    this.products.forEach((element) => {
      if (element.product == product) {
        ++element.quantity;
        let cart = {
          cartCount: this.cartCount + 1,
          products: this.products,
          totalPrice: this.totalPrice + product.price,
        };
        this.productService.setCart(cart);
        inCart = true;
        return;
      }
    });

    if (inCart == false) {
      let newProduct = {
        product: product,
        quantity: 1,
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price,
      };
      this.productService.setCart(cart);
    }
    let x = this.productService.addToCart(product);
    x.subscribe(data => console.log(data))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
