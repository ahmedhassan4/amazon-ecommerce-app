import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CategoryService } from '../../services/category.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private categoryService: CategoryService,
    private searchService: SearchService,
    private cartService: CartsService
  ) {}
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
    });
  }

}
