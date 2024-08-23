import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input() title:string='';
  @Input() category: string = '';
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByCategory(this.category).subscribe(
      (data: any[]) => {
        // Get the first four products from the category
        this.products = data.slice(0, 4);
      },
      (error) => {
        console.error('Error fetching products for category:', this.category, error);
      }
    );
  }
}
