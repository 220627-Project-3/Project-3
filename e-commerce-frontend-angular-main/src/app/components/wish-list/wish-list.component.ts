import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false,
  };

  wishProducts: any = [];

  subscription!: Subscription;

  cartCount: number = 0;
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice!: number;

  showError: boolean = false;

  /*
  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  totalProducts: any[] = [];
*/
  constructor(
    private productService: ProductService,
    private router: Router,
    private as: AuthService,
    private ws: WishListService,
    private toastr: ToastrService
  ) {}

  addToWishList(user: any) {
    console.log('HOWDYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');

    this.ws.getWishlist(user).subscribe((wish) => {
      console.log(wish);
      this.wishProducts = wish;
    });
  }

  removeFromWishList(id: number) {
    console.log(id);

    this.ws.deleteItemFromWishlist(id).subscribe({
      next: (data) => {
        console.log(data);
        console.log('Delete successful');
        this.ngOnInit();
      },
      error: (err) => {
        this.showError = true;
        this.toastr.error(
          'Unable to delete item from Wishlist at this time. Please try again later.',
          'Remove Wishlist Item Failed'
        );
        console.log(err);
      },
      complete: () => {
        this.toastr.success(
          'Item successfully removed from Wishlist.',
          'Item Removed From Wishlist Successful'
        );
      },
    });
  }

  ngOnInit(): void {
    let LOG = this.as.getSession().subscribe((user: any) => {
      console.log(user.id);
      this.addToWishList(user.id);
    });

    this.subscription = this.productService.getDetails().subscribe({
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

    // setTimeout(() => {console.log("sleeping"), console.log(LOG);}, 2000);

    // this.addToWishList();
  }

  addToCart(product: Product): void {
    console.log(product);
    let inCart = false;

    this.products.forEach((element) => {
      if (element.product == product) {
        console.log(element.product);
        console.log(product);
        ++element.quantity;
        let cart = {
          cartCount: this.cartCount + 1,
          products: this.products,
          totalPrice: this.totalPrice + product.price,
          this: this.toastr.success(
            'Your product has successfully been added to cart',
            'Product Added to Cart'
          ),
        };
        this.productService.setDetails(cart);
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
        this: this.toastr.success(
          'Your product has successfully been added to cart',
          'New Product Added to Cart'
        ),
      };
      this.productService.setDetails(cart);
    }
    let x = this.productService.addToCart(product, this.user);
    x.subscribe((data) => console.log(data));
  }

  getCurrentUserInfo(value: any) {
    this.user = value;
  }

}
