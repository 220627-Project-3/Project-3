import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishListItem } from '../models/wish-list-item';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  //ish: 

  environment = {
    production: false,
    withCredentials: true,
    baseUrl: "http://localhost:8080",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    },
  };

  constructor(private http: HttpClient) { }

  getWishlist(user_id: number) {
    let wishlist = this.http.get("http://localhost:8080/api/wishlist/" + user_id, this.environment);
    return wishlist;
    
  }

  addWishListItem(wishlistItem: any, user_id: any) {
    return this.http.post<any>("http://localhost:8080/api/wishlist/" + user_id, wishlistItem ,this.environment);
  }

  deleteItemFromWishlist(wishlistItem: any) {
    
  }

}
