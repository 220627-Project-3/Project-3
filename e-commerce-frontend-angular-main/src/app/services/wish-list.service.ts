import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishListItem } from '../models/wish-list-item';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  //ish: 

  constructor(private http: HttpClient) { }

  getWishlist(user_id: number): Observable<HttpResponse<WishListItem[]>> {
    let wishlist = this.http.get("http://localhost:8080/api/wishlist/" + user_id, { observe: "response"}) as Observable<HttpResponse<WishListItem[]>>;
    return wishlist;
  }

}
