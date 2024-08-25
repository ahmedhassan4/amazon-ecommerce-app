import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StripeService } from '../../services/stripe.service'; // Ensure correct path
import { OrdersService } from '../../services/orders.service'; // Ensure correct path
import { CartsService } from '../../services/carts.service'; // Ensure correct path
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/Iproduct';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: { product: IProduct; quantity: number }[] = [];
  totalPrice = 0;
  couponCode: string = ''; 
  discountAmount = 0; 
  staticCouponCode = 'DISCOUNT10'; 

  constructor(
    private stripeService: StripeService,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
    private cartService: CartsService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      paymentMethod: ['creditCard', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.cartProducts.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    this.totalPrice -= this.discountAmount; 
  }

  applyCoupon(): void {
    if (this.couponCode === this.staticCouponCode) {
      this.discountAmount = 10; 
      this.calculateTotalPrice(); 
      this.snackBar.open('coupon applied successfully!',  'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'customSnackbar'
      });
      // alert('Coupon applied successfully!');
    } else {
      // alert('Invalid coupon code!');
      this.snackBar.open('Invalid coupon code!',  'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'customSnackbar'
      });
    }
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
      cartItems: this.cartItems.map(item => ({
        name: item.product.title,
        price: item.product.price,
        quantity: item.quantity
      })),
      totalPrice: this.totalPrice
    };

    this.ordersService.saveOrder(order);

    this.checkout();
  }

  checkout(): void {
    this.stripeService.redirectToCheckout(); 
  }
}
