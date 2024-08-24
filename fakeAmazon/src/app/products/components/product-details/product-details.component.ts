import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../../models/Iproduct';
import { CommonModule } from '@angular/common';
import { CartsService } from '../../../carts/services/carts.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: number | null = null;
  data: IProduct = {
    id: 0,
    title: 'Default Title',
    price: 0,
    description: 'No description available.',
    category: 'Uncategorized',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 0, count: 0 },
  };

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private cartService: CartsService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getProduct();
  }

  getProduct(): void {
    if (this.id !== null) {
      this.service.getProductById(this.id).subscribe((res) => {
        this.data = res || this.data;
        console.log(this.data);
      });
    }
  }

  addToCart(): void {
    this.cartService.addProductToCart(this.data);
    // console.log('Product added to cart:', this.data);
  }
}
