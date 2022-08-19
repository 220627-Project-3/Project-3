import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false
  };

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  wishProducts: Product[] = [];

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private as: AuthService, 
    private ws: WishListService) { }

    addToWishList() {
      this.ws.getWishlist(this.as.getSession().id).subscribe(
        (wish) => {
          const wishString = wish.body?.toString;
          console.log(wishString);

          // this.products = wish.
          // this.products.forEach(
          //   (element) => this.wishProducts.push(element.product)
          // );
        }
      );
    }

  ngOnInit(): void {
    
  }


  
// I commented 
  addToCart(product: Product): void {
    let inCart = false;

    this.products.forEach((element) => {
      if (element.product == product) {
        ++element.quantity;
        let cart = {
          // cartCount: this.cartCount + 1,
          products: this.products,
          totalPrice: this.totalPrice + product.price,
        };
        // this.productService.setCart(cart);
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
        // cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price,
      };
      // this.productService.setCart(cart);
    }
  }
}
