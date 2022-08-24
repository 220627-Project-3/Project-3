import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, zip } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CookieService } from 'ngx-cookie';

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

  public Searching: String = '';
  public value: number = 0;
  public searchByValue: String = 'Any';

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private _cookieService: CookieService
  ) {}

  SearchProductByID(id: number) {
    this.productService.getProductById(id).subscribe({ next: (data) => {} });
  }

  ngOnInit(): void {
    this.productService.initializeCart();
    this.subscription = this.productService
      .getDetails()
      .subscribe((cart) => (this.cartCount = cart.cartCount));
    this.getCurrentUserInformation();
  }

  onChange(event: number) {
    this.value = event;
    console.log(this.value);
  }

  ChangeChange() {
    console.log('Changed');
    if (this.productService.z != 1) {
      this.productService.Changer(1);
      this.router
        .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['home']);
        });
    }
  }

  BigSearch() {
    console.log(this.searchByValue);
    console.log(this.Searching.length);
    if (this.Searching.length < 1) {
      console.log('this.Searching.length');
      this.productService.z = 2;
      this.searchByValue == 'Bob';
      this.ChangeChange();
      return;
    }
    if (this.searchByValue == 'Id') {
      this.SearchButt();
    } else if (this.searchByValue == 'Name') {
      this.SearchButtwithName();
    } else if (this.searchByValue == 'Desc') {
      this.SearchButtwithDesc();
    } else if (this.searchByValue == 'Any') {
      this.SearchButtwithAny();
    }
  }

  SearchButt() {
    this.productService.Changer(2);
    var numeric = Number(this.Searching);
    this.productService.SearchMan(numeric);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  SearchButtwithName() {
    this.productService.Changer(3);
    this.productService.SearchManName(this.Searching);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  SearchButtwithDesc() {
    this.productService.Changer(4);
    console.log(this.productService.z);
    this.productService.SearchManName(this.Searching);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  SearchButtwithAny() {
    this.productService.Changer(5);
    console.log(this.productService.z);
    this.productService.SearchManName(this.Searching);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getCurrentUserInformation() {
    if (this._cookieService.get('JSESSIONID') != undefined) {
      console.log('%c[User is logged in]', 'color: blue');
      this.authService.getSession().subscribe({
        next: (data: any) => {
          this.currentUserInfo = data;
          // console.log(this.currentUserInfo);
          this.authService.setUser(data);
          this.passCurrentUserInfo.emit(data);
        },
        error: (err: any) => {
          console.log('%c[User is not logged on]', 'color: orange');
          this._cookieService.removeAll();
          this.router.navigate(['login']);
          //console.log(err);
        },
        complete: () => {},
      });
    } else {
      console.log('%c[User is not logged on]', 'color: orange');
      this.router.navigate(['login']);
    }
  }

  resizeSelect(event: Event) {
    let mySelect = event.currentTarget as HTMLSelectElement;
    switch (mySelect.value.toLowerCase()) {
      case 'any':
        mySelect.style.width = '43px';
        break;
      case 'name':
        mySelect.style.width = '97px';
        break;
      case 'desc':
        mySelect.style.width = '123px';
        break;
      default:
        break;
    }
  }
}
