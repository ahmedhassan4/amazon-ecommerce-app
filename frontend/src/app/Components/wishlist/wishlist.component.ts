import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CartsService } from '../../services/carts.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// Adjust path

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  constructor(
    private notification: MatSnackBar,
    private wishlistService: WishlistService,
    private cartService: CartsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishList().subscribe(state => this.wishlist = state);
  }

  removeFromWishlist(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Do you really want to remove this item from your wishlist?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.wishlistService.removeFromWishList(id);
        this.notification.open("Product removed from wishlist successfully!", "Close", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'alert-red'
        });
      }
    });
  }

  moveToCart(item: any) {
    if (!this.isProdInCart(item.id)) {
      this.cartService.addProductToCart(item);
      this.notification.open('Product added to cart successfully!', 'Close', {
        duration: 1000,
        horizontalPosition: 'right',
        verticalPosition: "bottom",
        panelClass: 'alert-red'
      });
    } else {
      this.cartService.removeProductFromCart(item.id);
      this.notification.open("Product removed from cart successfully!", "Close", {
        duration: 1000,
        horizontalPosition: 'right',
        verticalPosition: "bottom",
        panelClass: 'alert-red'
      });
    }
  }

  isProdInCart(id: number): boolean {
    return this.cartService.isProductInCart(id);
  }

}
