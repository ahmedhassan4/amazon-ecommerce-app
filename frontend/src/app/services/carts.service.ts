import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cartItems: IProduct[] = [];
  private cartProductsSource = new BehaviorSubject<
    { product: IProduct; quantity: number }[]
  >([]);
  cartProducts = this.cartProductsSource.asObservable();
  private cartItemCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.updateCartItemCount();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  isProductInCart(productId: number): boolean {
    return this.cartProductsSource.value.some(item => item.product.id === productId);
  }
  
  // Remove a product from the cart
  // removeProductFromCart(productId: number): void {
  //   const updatedProducts = this.cartProductsSource.value.filter(item => item.product.id !== productId);
  //   this.cartProductsSource.next(updatedProducts);
  //   this.cartItemCountSubject.next(updatedProducts.length);
  // }
  addProductToCart(product: IProduct): void {
    const currentProducts = this.cartProductsSource.value;
    const existingProduct = currentProducts.find(
      (item) => item.product.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentProducts.push({ product, quantity: 1 });
    }

    this.cartProductsSource.next([...currentProducts]);
    this.updateCartItemCount();
    this.saveCartItems();
  }

  removeProductFromCart(productId: number): void {
    const currentProducts = this.cartProductsSource.value.filter(
      (item) => item.product.id !== productId
    );
    this.cartProductsSource.next(currentProducts);
    this.updateCartItemCount();
    this.saveCartItems();
  }

  increaseQuantity(productId: number): void {
    const currentProducts = this.cartProductsSource.value;
    const product = currentProducts.find(
      (item) => item.product.id === productId
    );
    if (product) {
      product.quantity += 1;
      this.cartProductsSource.next([...currentProducts]);
      this.updateCartItemCount();
      this.saveCartItems();
    }
  }

  decreaseQuantity(productId: number): void {
    const currentProducts = this.cartProductsSource.value;
    const product = currentProducts.find(
      (item) => item.product.id === productId
    );
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      this.cartProductsSource.next([...currentProducts]);
      this.updateCartItemCount();
      this.saveCartItems();
    }
  }

  private updateCartItemCount(): void {
    const count = this.cartProductsSource.value.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    this.cartItemCountSubject.next(count);
  }

  private saveCartItems(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartProductsSource.value));
  }
}
