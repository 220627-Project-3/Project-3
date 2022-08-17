import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, zip } from 'rxjs';
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

  SearchProductByID(id: number){
    this.productService.getSingleProduct(id).subscribe({next:(data)=>{
    
    }})
  }
  ngOnInit(): void {
    this.subscription = this.productService
      .getCart()
      .subscribe((cart) => (this.cartCount = cart.cartCount));
    this.getCurrentUserInformation();
  }
   public Searching: String='';
  ChangeChange(){
    console.log("Changed")
    if (this.productService.z==2){
    this.productService.Changer(1)
    /*var numeric = Number(this.Searching);
    this.productService.SearchMan(numeric)*/
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
  });}
  }

  SearchButt(){
    this.productService.Changer(2)
    var numeric = Number(this.Searching);
    this.productService.SearchMan(numeric);
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
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
