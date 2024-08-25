import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clothing-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clothing-section.component.html',
  styleUrl: './clothing-section.component.css'
})
export class ClothingSectionComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCombinedClothingProducts().subscribe(
      (data: any[]) => this.products = data.slice(0, 8), 
      error => console.error('Error fetching combined clothing products:', error)
    );
  }

}
