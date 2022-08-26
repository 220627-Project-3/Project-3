import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishListItem } from '../models/wish-list-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient) {}

  getWishlist(user_id: number) {
    let wishlist = this.http.get(
      environment.baseUrl + '/api/wishlist/' + user_id,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
    return wishlist;
  }

  addWishListItem(wishlistItem: any, user_id: any) {
    return this.http.post<any>(
      environment.baseUrl + '/api/wishlist/' + user_id,
      wishlistItem,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }

  deleteItemFromWishlist(wishlistItemId: number) {
    return this.http.delete(
      environment.baseUrl + '/api/wishlist/' + wishlistItemId,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
}
