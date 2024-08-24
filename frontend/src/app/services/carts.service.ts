import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/Iproduct';
@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cartItems: IProduct[] = [];
  private cartProductsSource = new BehaviorSubject<{ product: IProduct; quantity: number }[]>([]);
  cartProducts = this.cartProductsSource.asObservable();
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    // Load cart items from local storage or another source
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.updateCartItemCount();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  addProductToCart(product: IProduct): void {
    const currentProducts = this.cartProductsSource.value;
    const existingProduct = currentProducts.find(item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentProducts.push({ product, quantity: 1 });
    }

    this.cartProductsSource.next([...currentProducts]);
    this.updateCartItemCount();
    this.saveCartItems();
  }

  private updateCartItemCount(): void {
    const count = this.cartProductsSource.value.reduce((acc, item) => acc + item.quantity, 0);
    this.cartItemCountSubject.next(count);
  }

  private saveCartItems(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartProductsSource.value));
  }
}
