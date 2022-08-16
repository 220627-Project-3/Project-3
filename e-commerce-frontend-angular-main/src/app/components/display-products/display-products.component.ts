import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];
  currentUserInfo: any = {};

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
    });
  }

  getCurrentUserInfo(value: any) {
    this.currentUserInfo = value;
  }
}
