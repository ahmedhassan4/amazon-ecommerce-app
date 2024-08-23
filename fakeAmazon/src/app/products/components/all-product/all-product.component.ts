import { Component } from '@angular/core';
import { IProduct } from '../../../../models/Iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css',
})
export class AllProductComponent {
  products: IProduct[] = [];

  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
