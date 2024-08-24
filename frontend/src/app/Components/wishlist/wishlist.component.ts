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
  constructor(private wishlistService : WishlistService,private authServ : AuthService,private cartServive : CartsService) { }
  ngOnInit(): void {
  this.authServ.getUserState().subscribe(state => this.isLoggedIn = state)
}
  wishlist: any[] = [];



  // removeFromWishlist(id: number) {
  //   this.wishlist = this.wishlist.filter(item => item.id !== id);
  // }

  moveToCart(item: any) {
   this.wishlistService.getWishList().subscribe(state => console.log(state))
    this.cartServive.addProductToCart(item)
  }
}
