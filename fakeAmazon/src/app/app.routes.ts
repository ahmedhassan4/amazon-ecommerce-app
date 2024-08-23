import { Routes } from '@angular/router';
import { AllProductComponent } from './products/components/all-product/all-product.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'products', component: AllProductComponent },
  { path: 'details', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: PageNotFoundComponent },
];
