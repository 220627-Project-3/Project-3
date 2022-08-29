import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId?: string;
  theProduct?: Product;
  environment = environment;

  cartCount!: number;
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    isAdmin: false,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private _authService: AuthService,
    private ws: WishListService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params.id;
      //console.log('productId', this.productId);

      this.productService
        .getSingleProduct(parseInt(this.productId!))
        .subscribe({
          next: (data) => {
            this.theProduct = data;
            //console.log('this.theProduct', this.theProduct);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Products Retrieved');
          },
        });
    });
  }

  ngOnInit(): void {
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
    this._authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Retrieved user info from card component');
      },
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
      };
      this.productService.setDetails(cart);
    }
    let x = this.productService.addToCart(product, this.user);
    x.subscribe({
      next: (data) => {
        this.toastr.success('Your product has successfully been added to cart');
      },
      error: (err) => {
        this.toastr.error('Failed to add product to cart, try again later');
      },
    });
  }

  addToWishList(product: Product) {
    // console.log(this.products);
    //console.log(this.user?.id);
    //console.log(product);
    //console.log(this.user);
    this.ws.addWishListItem(product.id, this.user?.id).subscribe({
      next: (data) => {
        this.toastr.success('Product has successfully been added to wishlist');
      },
      error: (err) => {
        this.toastr.error(
          'Failed to add product to wishlist, please refresh and try again'
        );
      },
    });
  }
}
