import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishList = new BehaviorSubject<any>([]);
  constructor() { }

  saveWishListToLocalStorage() {
    localStorage.setItem('wish', JSON.stringify(this.wishList))
  }

  addToWishList(product: any) {

    let foundedProd = this.wishList.value.find()
  }

  // getWishLishFromLocalStorage() { 
  //   return localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist" || "[]")) : []
  // }


  getWishList():Observable<any> {
    return this.wishList.asObservable()
  }
}
