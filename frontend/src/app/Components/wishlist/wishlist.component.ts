import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  wishlist = [
    {
      id: 1,
      name: 'Product Name 1',
      description: 'Short product description goes here.',
      price: 29.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Product Name 2',
      description: 'Short product description goes here.',
      price: 49.99,
      image: 'https://via.placeholder.com/150'
    },
    // Add more items here...
  ];

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== id);
  }

  moveToCart(item: any) {
    console.log('Move to cart:', item);
    this.removeFromWishlist(item.id);
  }

}
