import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = +Number(cart.totalPrice).toFixed(2);
      }
    );
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

  removeItem(id: number){
    console.log(id);
    let index = this.products.findIndex(e => e.product.id === id);
    if(index !== -1){
      this.products[index].quantity = this.products[index].quantity - 1;
      this.totalPrice = this.totalPrice - this.products[index].product.price;
      if(this.products[index].quantity < 1){
        this.products.splice(index,1);
      }
    }
    let count = 0;
    this.products.forEach(e => count = count + e.quantity)
    this.totalPrice = + Number(this.totalPrice).toFixed(2);
    let cart = {
      cartCount: count,
      products: this.products,
      totalPrice: this.totalPrice
    };
    this.productService.setCart(cart);
  }

}
