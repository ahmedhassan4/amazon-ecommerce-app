import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AuthGuard, LoggedGuard } from './guard/auth.guard';
import { CartComponent } from './Components/cart/cart.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { AllProductComponent } from './Components/products/components/all-product/all-product.component';
import { ProductDetailsComponent } from './Components/products/components/product-details/product-details.component';

export const routes: Routes = [
    {
        path:'',
        component :MainLayoutComponent,
        children:[
            {path: '', component: HomeComponent},
            {path: 'wishlist', component: WishlistComponent, canActivate:[AuthGuard]},
            { path: 'products', component: AllProductComponent },
            { path: 'details/:id', component: ProductDetailsComponent },
            { path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard] },
            { path: 'cart', component: CartComponent,canActivate:[AuthGuard] },
         

        ]
    },
    { path: "login", component: LoginComponent, canActivate:[LoggedGuard] }, 
    { path: "signup" , component: SignupComponent, canActivate:[LoggedGuard] },
    { path: '**', component: PageNotFoundComponent },
];
