import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishList: BehaviorSubject<any[]>;
  private localWishlist: any[] = [];

  constructor() { 
    this.localWishlist = this.getWishFromLocal();
    this.wishList = new BehaviorSubject<any[]>(this.localWishlist);
  }

  private saveWishList(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishList.value));
  }

  addToWishList(product: any): void {
    let foundProd = this.wishList.value.find(item => item.id === product.id);
    if (!foundProd) {
      this.localWishlist.push(product);
      this.wishList.next(this.localWishlist);
      this.saveWishList();
    }
  }

  removeFromWishList(productId: any): void {
    this.localWishlist = this.localWishlist.filter(item => item.id !== productId);
    this.wishList.next(this.localWishlist);
    this.saveWishList();
  }

  isProdInWishlist(id: number) :boolean { 
    return this.wishList.value.some((product) => product.id == id)
  }

  private getWishFromLocal(): any[] {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }

  getWishList(): Observable<any[]> {
    return this.wishList.asObservable();
  }
}
