import { Component } from '@angular/core';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ElectronicsSectionComponent } from '../electronics-section/electronics-section.component';
import { ClothingSectionComponent } from '../clothing-section/clothing-section.component';
import { TopBrandsSectionComponent } from '../top-brands-section/top-brands-section.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ProductCarouselComponent,
    ProductCardComponent,
    ElectronicsSectionComponent,
    ClothingSectionComponent,
    TopBrandsSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
}
