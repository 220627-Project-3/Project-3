import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { WishListService } from 'src/app/services/wish-list.service';
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
  @Input() user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    isAdmin: false,
  };

  @Input() productInfo: Product = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    image: '',
  };

  constructor(
    private productService: ProductService,
    private _authService: AuthService,
    private ws: WishListService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService.getDetails().subscribe({
      next: (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(
          'Failed to add your product to cart, please refresh and try again',
          'Failed to add product to cart'
        );
      },
      complete: () => {
        console.log('Received data from papa component');
      },
    });
    // Why are we sending HTTP requests to get user info for each product card?
    // this._authService.getSession().subscribe({
    //   next: (data: any) => {
    //     this.user = data;
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('Retrieved user info from card component');
    //   },
    // });
    // this.productInfo
  }

  addToCart(product: Product): void {
    // let inCart = false;

    // this.products.forEach((element) => {
    //   if (element.product == product) {
    //     ++element.quantity;
    //     let cart = {
    //       cartCount: this.cartCount + 1,
    //       products: this.products,
    //       totalPrice: this.totalPrice + product.price,
    //       // Why is this code here?
    //       // this: this.toastr.success(
    //       //   'Your product has successfully been added to cart',
    //       //   'Product Added to Cart'
    //       // ),
    //     };
    //     this.productService.setDetails(cart);
    //     inCart = true;
    //     return;
    //   }
    // });

    // if (inCart == false) {
    // let newProduct = {
    //   product: product,
    //   quantity: 1,
    // };
    // this.products.push(newProduct);
    // let cart = {
    //   cartCount: this.cartCount + 1,
    //   products: this.products,
    //   totalPrice: this.totalPrice + product.price,
    // };
    // this.productService.setDetails(cart);

    let x = this.productService.addToCart(product, this.user);
    x.subscribe({
      next: (data) => {
        console.log(data);
        if(data.status == 200) {
          this.toastr.info('Cannot add more than stock', 'Information');
        } else {
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: this.totalPrice + product.price,
          };
          this.productService.setDetails(cart);
          this.toastr.success('Your product has successfully been added to cart');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to add product to cart, try again later');
      },
    });
    // }
  }

  addToWishList(product: Product) {
    console.log(this.products);
    console.log(this.user?.id);
    console.log(product);
    this.ws.addWishListItem(product.id, this.user?.id).subscribe({
      next: (wish: any) => {
        // const wishString = wish.body?.toString;
        // console.log(wishString);
        console.log(this.products);
        console.log(this.user);
        this.toastr.success('Product has successfully been added to wishlist');

        // the wish list service works in a way that it collects the user_id
        // to then transport the user to their specific wishlist page
        //

        // this.products = wish.
        // this.products.forEach(
        //   (element) => this.wishProducts.push(element.product)
        // );
      },
      error: (err: any) =>
        this.toastr.error(
          'Failed to add product to wishlist, please refresh and try again'
        ),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
