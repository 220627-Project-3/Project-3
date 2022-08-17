import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount!: number;
  subscription!: Subscription;
  currentUserInfo: any = {};
  @Output() passCurrentUserInfo = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService
      .getCart()
      .subscribe((cart) => (this.cartCount = cart.cartCount));
    this.getCurrentUserInformation();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getCurrentUserInformation() {
    this.authService.getSession().subscribe({
      next: (data: any) => {
        this.currentUserInfo = data;
        console.log(this.currentUserInfo);
        this.authService.setUser(data);
        this.passCurrentUserInfo.emit(data);
      },
      error: (err: any) => {
        console.log('User is not logged on');
        console.log(err);
      },
      complete: () => {},
    });
  }
}
