import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SearchService } from '../../services/search.service';
import { IProduct } from '../../models/Iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from '../../services/carts.service';
import { MessageService } from 'primeng/api'; 
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule,ToastModule, ButtonModule, RippleModule],
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
    private messageService: MessageService // Inject MessageService
  ) {}

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
    this.cartService.addProductToCart(product);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product added to cart'
    });
    console.log('Product added to cart:', product);
  } 
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
}
