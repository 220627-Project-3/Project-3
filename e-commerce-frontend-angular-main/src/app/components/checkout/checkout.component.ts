import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: { id: number; quantity: number }[] = [];

  checkoutForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    cardName: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    addOne: new FormControl('', Validators.required),
    addTwo: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.getDetails().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = cart.totalPrice;
      if (this.totalPrice == 0) {
        this.router.navigate(['/cart']);
        this.toastr.error(
          'Add some items to your cart before checking out',
          'Checkout failed'
        );
      }
    });
  }

  onSubmit(event: Event): void {
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.products.forEach((element) => {
        const id = element.product.id;
        const quantity = element.quantity;
        this.finalProducts.push({ id, quantity });
      });

      if (this.finalProducts.length > 0) {
        this.productService.purchase(this.finalProducts).subscribe({
          next: (resp) => console.log(resp),
          error: (err) => console.log(err),
          complete: () => {
            let cart = {
              cartCount: 0,
              products: [],
              totalPrice: 0.0,
            };
            this.productService.setDetails(cart);
            this.router.navigate(['/home']);
          },
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
    form.classList.add('was-validated');
  }
}
