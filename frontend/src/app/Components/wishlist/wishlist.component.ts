import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartsService } from '../../services/carts.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private notification: MatSnackBar,
    private wishlistService : WishlistService,
    private cartServive : CartsService){}



  ngOnInit(): void {
     this.wishlistService.getWishList().subscribe(state => this.wishlist = state) //fill wishlist

   }

//remove from wishlist
  removeFromWishlist(id: number) {
    this.wishlistService.removeFromWishList(id);
    this.notification.open("Item Removed successfully!", "Close", {
      duration :1000,
      horizontalPosition: 'right',
      verticalPosition: "top",
      panelClass: 'alert-red'
    })
  }
//move to cart
  moveToCart(item: any) {
    if(!this.isProdInCart(item.id)){ 
      this.cartServive.addProductToCart(item)
      this.notification.open('Item added to cart successfully!', 'Close', {
        duration: 1000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'alert-red'
      })
    }else{
      this.cartServive.removeProductFromCart(item.id) 
      this.notification.open("Item Removed from cart successfully!", "Close", {
        duration :1000,
        horizontalPosition: 'right',
        verticalPosition: "top",
        panelClass: 'alert-red'
      })
    }
    
  }

//is in Cart
  isProdInCart(id:number): boolean {
    return this.cartServive.isProductInCart(id) 
  }
}
