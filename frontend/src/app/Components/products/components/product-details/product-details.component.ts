import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../models/Iproduct';
import { CartsService } from '../../../../services/carts.service';
import { ProductService } from '../../../../services/product.service';
import { WishlistService } from '../../../../services/wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private service: ProductService,
    private cartService: CartsService,
    private wishlistService: WishlistService,
    private notification: MatSnackBar
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

    if(!this.isProdInCart(this.data.id)){
      this.cartService.addProductToCart(this.data);
      this.notification.open('Product added to Cart successfully!', 'Close', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: "top",
        panelClass: 'alert-red'
      });
    }else{ 
      this.cartService.removeProductFromCart(this.data.id)
      this.notification.open('Product remove to Cart successfully!', 'Close', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: "top",
        panelClass: 'alert-red'
      });
    };
    
    // console.log('Product added to cart:', this.data);
  }

  rateProduct(rating: number): void {
    // Update the product rating and count
    const newCount = this.data.rating.count + 1;
    const newRate =
      (this.data.rating.rate * this.data.rating.count + rating) / newCount;

    // Update the product's data with the new rating
    this.data.rating.rate = newRate;
    this.data.rating.count = newCount;
  }

  // rateProduct(rating: number): void {
  //   this.data.rating.rate = rating;
  //   this.data.rating.count += 1;
  // }

  addToWishLish(prod: any) {
    if (!this.isProdInWish(prod.id)) {
      this.wishlistService.addToWishList(prod);
      this.notification.open(
        'Product added to wishlist successfully!',
        'Close',
        {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'alert-red',
        }
      );
  // rateProduct(rating: number): void {
  //   // Update the product rating and count
  //   const newCount = this.data.rating.count + 1;
  //   const newRate =
  //     (this.data.rating.rate * this.data.rating.count + rating) / newCount;

  //   // Update the product's data with the new rating
  //   this.data.rating.rate = newRate;
  //   this.data.rating.count = newCount;
  // }

  isProdInCart(id:number): boolean {
   return this.cartService.isProductInCart(id)
  }

  rateProduct(rating: number): void {
    let count = 0;
    this.data.rating.rate = rating;
    if(count < 1) { 
      count +=1
      this.data.rating.count += 1;
    }
  }

  addToWishLish(prod: any) { 
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

  isProdInWish(id: any) {
    return this.wishlistService.isProdInWishlist(id);
  }
}
