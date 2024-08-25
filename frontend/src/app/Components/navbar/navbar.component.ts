import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CategoryService } from '../../services/category.service';
import { CartsService } from '../../services/carts.service';
import { AuthService } from '../../services/auth/auth.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private searchService: SearchService,
    private cartService: CartsService,
    private authService : AuthService,
    private router : Router,
    private wishlistService : WishlistService
  ) {}
  //yassin edit ;)
  wishlistLength:number = 0;
  isLogged!:boolean;



  cartItemCount: number = 0;
  searchText: string = '';



  updateSearchText(inputEl: HTMLInputElement): void {
    this.searchText = inputEl.value;
    this.searchService.setSearchQuery(this.searchText);
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    this.categoryService.setCategory(selectedCategory);
    console.log(selectedCategory);
  }


  ngOnInit(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
      this.authService.getUserState().subscribe(state => this.isLogged = state)
    });

    this.wishlistService.getWishList().subscribe(wishlist => this.wishlistLength = wishlist.length)
  }

  logOut() { 
    this.authService.logOut()
    this.router.navigateByUrl("/")
  }

  
}
