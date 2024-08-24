import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Products } from '../products/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
//implements OnChanges
export class ProductComponent {
  @Input() product!:Products;
  
// dependancy injection
  constructor(private productServ: ProductsService) {}

  

}
