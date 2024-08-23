import { Component } from '@angular/core';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ElectronicsSectionComponent } from '../electronics-section/electronics-section.component';
import { ClothingSectionComponent } from '../clothing-section/clothing-section.component';
import { TopBrandsSectionComponent } from '../top-brands-section/top-brands-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCarouselComponent, ProductCardComponent,ElectronicsSectionComponent,ClothingSectionComponent,TopBrandsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  currentSlide = 0;
  totalSlides = 3;


}
