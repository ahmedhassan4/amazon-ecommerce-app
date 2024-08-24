import { Injectable } from '@angular/core';

interface Order {
  name: string;
  address: string;
  cartItems: { name: string; price: number; quantity: number }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersKey = 'orders';

  constructor() {
    if (!localStorage.getItem(this.ordersKey)) {
      localStorage.setItem(this.ordersKey, JSON.stringify([]));
    }
  }

  saveOrder(order: Order): void {
    const orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    orders.push(order);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    console.log('Order saved:', order);
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
  }
}
