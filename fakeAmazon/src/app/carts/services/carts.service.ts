import { Injectable } from '@angular/core';
import { IProduct } from '../../models/Iproduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cartProductsSource = new BehaviorSubject<
    { product: IProduct; quantity: number }[]
  >([]);
  cartProducts = this.cartProductsSource.asObservable();

  addProductToCart(product: IProduct): void {
    const currentProducts = this.cartProductsSource.value;
    console.log('Current cart products:', currentProducts);

    const existingProduct = currentProducts.find(
      (item) => item.product.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentProducts.push({ product, quantity: 1 });
    }

    this.cartProductsSource.next([...currentProducts]);
    console.log('Product added:', product);
    console.log('Updated cart products:', this.cartProductsSource.value);
  }
}
