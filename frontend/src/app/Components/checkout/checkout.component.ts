import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StripeService } from '../../services/stripe.service'; // Ensure correct path
import { OrdersService } from '../../services/orders.service'; // Ensure correct path
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  name: string;
  address: string;
  cartItems: CartItem[];
  totalPrice: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'] 
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems = [
    { name: 'Product 1', price: 20, quantity: 2 },
    { name: 'Product 2', price: 15, quantity: 1 },
  ];
    totalPrice = 0;
  staticCouponCode = 'DISCOUNT10'; 

  constructor(
    private stripeService: StripeService,
    private ordersService: OrdersService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formData = this.checkoutForm.value;
    const order = {
      name: formData.name,
      address: formData.address,
      cartItems: this.cartItems,
      totalPrice: this.totalPrice
    };

    this.ordersService.saveOrder(order);

    this.checkout();
  }

  checkout(): void {
    this.stripeService.redirectToCheckout(); 
  }
}
