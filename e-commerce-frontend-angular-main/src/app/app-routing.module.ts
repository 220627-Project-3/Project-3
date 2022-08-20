import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateProductsComponent } from './components/update-products/update-products.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: DisplayProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'update-products/:id', component: UpdateProductsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  {path: 'wish-list', component: WishListComponent},
  { path: 'create-product', component: CreateProductComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent},
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
