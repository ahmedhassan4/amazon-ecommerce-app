import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/Iproduct';
import { CartsService } from '../../services/carts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: { product: IProduct; quantity: number }[] = [];

  constructor(private cartService: CartsService) {}

  ngOnInit(): void {
    this.cartService.cartProducts.subscribe((products) => {
      console.log('Cart subscription:', products);
      this.cartProducts = products;
    });
  }

  getTotalPrice(product: IProduct, quantity: number): number {
    return product.price * quantity;
  }
}
