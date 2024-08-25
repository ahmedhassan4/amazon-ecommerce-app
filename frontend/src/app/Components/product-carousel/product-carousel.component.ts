import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SearchService } from '../../services/search.service';
import { IProduct } from '../../models/Iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from '../../services/carts.service';
import { MessageService } from 'primeng/api'; 
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule,ToastModule,MatSnackBarModule, ButtonModule, RippleModule],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
  providers: [MessageService] 
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
  @Input() products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  private subscriptions: Subscription[] = [];
  private selectedCategory: string = '';
  private searchQuery: string = '';
  id: number | null = null;
  data: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private searchService: SearchService,
    private cartService: CartsService,
    private snackBar: MatSnackBar,
    private authService: AuthService, 
    private wishlistService: WishlistService,
    private router: Router 
  ) {}
  isLogged!:boolean;

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToCategoryChanges();
    this.subscribeToSearchQueryChanges();
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getProduct();
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

  getProduct(): void {
    if (this.id !== null) {
      this.productService.getProductById(this.id).subscribe((res) => {
        this.data = res || this.data;
        console.log(this.data);
      });
    }
  }

  addToCart(product: IProduct): void {
    if (!this.authService.isLogged) {
     
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartService.isProductInCart(product.id)) {
      this.cartService.removeProductFromCart(product.id);
      this.snackBar.open('Item removed from cart!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'customSnackbar'
      });
    } else {
      this.cartService.addProductToCart(product);
      this.snackBar.open('Item added to cart successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'customSnackbar'
      });
    }
    this.applyFilters(); 
  }

  isProductInCart(productId: number): boolean {
    return this.cartService.isProductInCart(productId);
  }
  
  addToWishlist(prod: any) { 
    if(!this.isProdInWish(prod.id)){ 
      this.wishlistService.addToWishList(prod)
      this.snackBar.open('Product added to wishlist successfully!', 'Close', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: "top",
        panelClass: 'alert-red'
      });
    }else{
      this.wishlistService.removeFromWishList(prod.id)
      this.snackBar.open('Product removed to wishlist successfully!', 'Close', {
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

  show() {
    this.snackBar.open('Item added to cart successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'customSnackbar'
    });
  }
}
