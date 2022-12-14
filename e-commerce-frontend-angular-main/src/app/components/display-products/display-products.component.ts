import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];
  currentUserInfo: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    isAdmin: false
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {

    if(this.productService.z==2||this.productService.z==1){
    this.SearchButtonStuff(this.productService.idPr);}
    else if(this.productService.z==3||this.productService.z==4||this.productService.z==5){
    this.SearchButtonStuffName(this.productService.NamePr);}

    }
  SearchButtonStuff(Luis: number){
    if(this.productService.z==1){
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.allProducts = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Products Retrieved');
        },
      });}else if(this.productService.z==2){
        this.productService.getProductById(Luis).subscribe({
          next: (data) => {
            this.allProducts = [data];
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Products Retrieved');
          },
        });}

  }
  SearchButtonStuffName(Luis: String){
    if(this.productService.z==3){
      this.productService.getProductsByName(Luis).subscribe({
        next: (data) => {
          this.allProducts = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Products Retrieved');
        },
      });}else if(this.productService.z==4){
        console.log("Yes")
        this.productService.getProductsByDesc(Luis).subscribe({
          next: (data) => {
            this.allProducts = data;
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Products Retrieved');
          },
        });}else if(this.productService.z==5){
          this.productService.getProductsByAny(Luis).subscribe({
            next: (data) => {
              this.allProducts = data;
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              console.log('Products Retrieved');
            },
          });}


  }
  getCurrentUserInfo(value: any) {
    this.currentUserInfo = value;
  }
}
