import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-electronics-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electronics-section.component.html',
  styleUrl: './electronics-section.component.css'
})
export class ElectronicsSectionComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsByCategory('electronics').subscribe(
      (data: any[]) => this.products = data.slice(0, 4),
      error => console.error('Error fetching electronics products:', error)
    );
  }
}
