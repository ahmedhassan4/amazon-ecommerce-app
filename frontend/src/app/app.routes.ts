import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    {
        path:'',
        component :MainLayoutComponent,
        children:[
            {path: '', component: HomeComponent}
        ]
    },
    { 
        path: "login", component: LoginComponent 
    }
];
