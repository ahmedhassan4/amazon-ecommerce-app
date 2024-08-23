import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component :MainLayoutComponent,
        children:[
            {path: '', component: HomeComponent},
            {path: 'wishlist', component: WishlistComponent, canActivate:[AuthGuard]}
        ]
    },
    { path: "login", component: LoginComponent }, 
    { path: "signup" , component: SignupComponent }
];
