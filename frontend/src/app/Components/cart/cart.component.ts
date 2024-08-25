import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsService } from '../../services/carts.service';
import { IProduct } from '../../models/Iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: { product: IProduct; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartsService,
    private router: Router
  ) {}
  navigate(): void {
    this.router.navigate(['/checkout']); 
  }
  ngOnInit(): void {
    this.cartService.cartProducts.subscribe((products) => {
      this.cartProducts = products;
      this.calculateTotalPrice(); 
    });
  }

  getTotalPrice(product: IProduct, quantity: number): number {
    return product.price * quantity;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce(
      (acc, item) => acc + this.getTotalPrice(item.product, item.quantity),
      0
    );
  }

  removeProduct(productId: number): void {
    this.cartService.removeProductFromCart(productId);
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }
}
