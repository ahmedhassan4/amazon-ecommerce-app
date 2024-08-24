import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SearchService } from '../../services/search.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-belt',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-belt.component.html',
  styleUrls: ['./nav-belt.component.css'],
})
export class NavBeltComponent {
  constructor(
    private categoryService: CategoryService,
    private searchService: SearchService
  ) {}

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
}
