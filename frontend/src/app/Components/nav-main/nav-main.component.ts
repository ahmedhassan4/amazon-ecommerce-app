import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css',
})
export class NavMainComponent implements OnInit{
  wishlist: number= 0;
  constructor (private wishlistService : WishlistService) {}
  ngOnInit(): void {
   this.wishlistService.getWishList().subscribe(state => this.wishlist = state.length )
  }
}
