import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  headingToCheckout() {
    this.toastr.success('', 'Heading to Checkout');
  }
  ngOnInit(): void {
    this.productService.getDetails().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = +Number(cart.totalPrice).toFixed(2);
    });
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.0,
    };
    this.productService.setDetails(cart);
    this.toastr.info('', 'Your Cart Is Now Empty');
    //this.router.navigate(['/home']);
  }

  removeItem(id: number, qty: string) {
    // const qtyInput = document.getElementById('quantity') as HTMLInputElement;
    // let qty = qtyInput?.value;
    console.log(qty);
    let index = this.products.findIndex((e) => e.product.id === id);
    //if quantity input is empty, remove 1 of the product
    if (qty == '') {
      if (index !== -1) {
        this.products[index].quantity = this.products[index].quantity - 1;
        this.totalPrice = this.totalPrice - this.products[index].product.price;
        if (this.products[index].quantity < 1) {
          this.products.splice(index, 1);
        }
      }
    }
    //if it is not empty, convert to number and continue
    else {
      let qtyNum: number = +qty;
      //if we can remove the specified amount - do it
      if (qtyNum > 0 && qtyNum <= this.products[index].quantity) {
        if (index !== -1) {
          this.products[index].quantity =
            this.products[index].quantity - qtyNum;
          this.totalPrice =
            this.totalPrice - qtyNum * this.products[index].product.price;
          if (this.products[index].quantity < 1) {
            this.products.splice(index, 1);
          }
        }
      }
      //input is negative or greater than what we have
      else {
        console.log('Invalid Input');
      }
    }
    //update cart
    let count = 0;
    this.products.forEach((e) => (count = count + e.quantity));
    this.totalPrice = +Number(this.totalPrice).toFixed(2);
    let cart = {
      cartCount: count,
      products: this.products,
      totalPrice: this.totalPrice,
    };
    this.productService.setDetails(cart);
  }
}
