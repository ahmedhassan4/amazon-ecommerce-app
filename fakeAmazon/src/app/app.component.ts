import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBeltComponent } from './shared/components/nav-belt/nav-belt.component';
import { NavMainComponent } from './shared/components/nav-main/nav-main.component';
import { AllProductComponent } from './products/components/all-product/all-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBeltComponent,
    NavMainComponent,
    AllProductComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'amazontest';
}
