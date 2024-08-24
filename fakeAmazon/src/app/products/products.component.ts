import { Component, OnChanges, OnInit } from '@angular/core';
import { Products } from './products';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,ProductComponent,NgbDropdownModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  allProducts: Products[] = [];
  constructor(private productServ: ProductsService) {}
  ngOnInit(): void {
    this.allProducts = this.productServ.getAllProducts();
  }
  sort(order: 'asc' | 'desc') {
    this.allProducts = this.productServ.sortByPrice(order) ;
  }
  filter(category:string){
    this.allProducts = this.productServ.FilterProductsByCategory(category) ;
  }
  // ngOnChanges(): void {
  //   this.allProducts = this.productServ.FilterProductsByCategory(this.productCateg) ;
  // }
}
