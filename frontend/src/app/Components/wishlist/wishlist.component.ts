import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit  {
  isLoggedIn!:boolean
  constructor(private authServ : AuthService) { }
  ngOnInit(): void {
  this.authServ.getUserState().subscribe(state => this.isLoggedIn = state)
}
  wishlist = [
    {
      id: 1,
      name: 'Product Name 1',
      description: 'Short product description goes here.',
      price: 29.99,
      image: 'https://m.media-amazon.com/images/I/51rF5TKzVTL._AC_SX522_.jpg'
    },
    {
      id: 2,
      name: 'Product Name 2',
      description: 'Short product description goes here.',
      price: 49.99,
      image: 'https://m.media-amazon.com/images/I/817QL8-1+GL._AC_SX679_.jpg'
    },  {
      id: 3,
      name: 'Product Name 3',
      description: 'Short product description goes here.',
      price: 29.99,
      image: 'https://m.media-amazon.com/images/I/616for3q0ML._AC_SX679_.jpg'
    }
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
