import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<any>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51Pocw9P8naSBg9OwVJjLj7L2MG3b9atQH3bkeFb3tCgMVgHQsnF9oNYwlBInor962LGIgZXzc63vt21tOOVF63EZ00Zeg3G3K5');
  }

  async redirectToCheckout(): Promise<void> {
    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe failed to load.');
      return;
    }

  
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
              price: 'price_1Pod9QP8naSBg9OwGQCOu44Q', 
              quantity: 1,
          },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}`,
      cancelUrl: `${window.location.origin}`,
      });

      if (error) {
        console.error('Error during redirect to Checkout:', error);
      }
    }
  }

