import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartsService } from '../../services/carts.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit  {
  isLoggedIn!:boolean
  wishlist: any[] = [];

  constructor(private wishlistService : WishlistService,private authServ : AuthService,private cartServive : CartsService) { }
  ngOnInit(): void {
  this.wishlistService.getWishList().subscribe(state => this.wishlist = state) //fill wishlist

}

//remove from wishlist
  removeFromWishlist(id: number) {
    this.wishlistService.removeFromWishList(id)
  }
//move to cart
  moveToCart(item: any) {
    this.cartServive.addProductToCart(item)
  }
}
