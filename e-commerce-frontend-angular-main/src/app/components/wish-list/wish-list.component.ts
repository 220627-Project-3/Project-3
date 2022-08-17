import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  
  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
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
