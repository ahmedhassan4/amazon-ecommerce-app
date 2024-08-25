import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../../models/Iproduct';
import { CategoryService } from '../../../../services/category.service';
import { SearchService } from '../../../../services/search.service';
import { ProductService } from '../../../../services/product.service';
import { WishlistService } from '../../../../services/wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  private subscriptions: Subscription[] = [];
  private selectedCategory: string = '';
  private searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private searchService: SearchService,
    private wishlistService: WishlistService,
    private notification : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToCategoryChanges();
    this.subscribeToSearchQueryChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private loadProducts(): void {
    this.subscriptions.push(
      this.productService.getAllProducts().subscribe((data) => {
        this.products = data;
        this.applyFilters();
      })
    );
  }

  private subscribeToCategoryChanges(): void {
    this.subscriptions.push(
      this.categoryService.category.subscribe((category) => {
        this.selectedCategory = category;
        this.applyFilters();
      })
    );
  }

  private subscribeToSearchQueryChanges(): void {
    this.subscriptions.push(
      this.searchService.searchQuery$.subscribe((query) => {
        this.searchQuery = query;
        this.applyFilters();
      })
    );
  }

  private applyFilters(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        this.isProductInCategory(product, this.selectedCategory) &&
        this.isProductMatchingSearch(product, this.searchQuery)
    );
  }

  private isProductInCategory(product: IProduct, category: string): boolean {
    return category === '' || product.category === category;
  }

  private isProductMatchingSearch(
    product: IProduct,
    searchQuery: string
  ): boolean {
    return (
      searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

// wish list basita 5ales

  addToWishlist(prod: any) { 
    
    if(!this.isProdInWish(prod.id)){ 
      this.wishlistService.addToWishList(prod)
      this.notification.open('Product added to wishlist successfully!', 'Close', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: "top",
        panelClass: 'alert-red'
      });
    }
    

  }

  isProdInWish(id:any){
    return this.wishlistService.isProdInWishlist(id)
  }
}
