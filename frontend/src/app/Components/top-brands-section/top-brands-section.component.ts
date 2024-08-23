import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-brands-section',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './top-brands-section.component.html',
  styleUrl: './top-brands-section.component.css'
})
export class TopBrandsSectionComponent {
  topBrands = [
    { name: 'Brand A', logo: 'asus.jpg', popularProducts: ['Product 1', 'Product 2'] },
    { name: 'Brand B', logo: 'air.jpg', popularProducts: ['Product 3', 'Product 4'] },
    { name: 'Brand C', logo: 'sony.jpg', popularProducts: ['Product 5', 'Product 6'] },
    { name: 'Brand D', logo: 'English.jpg', popularProducts: ['Product 7', 'Product 8'] },
    { name: 'Brand E', logo: 'mi.jpg', popularProducts: ['Product 9', 'Product 10'] },
    { name: 'Brand F', logo: 'western.jpg', popularProducts: ['Product 11', 'Product 12'] },
    { name: 'Brand G', logo: 'jbl.jpg', popularProducts: ['Product 13', 'Product 14'] },
    { name: 'Brand H', logo: 'jabra.jpg', popularProducts: ['Product 15', 'Product 16'] },
    { name: 'Brand I', logo: 'head.jpg', popularProducts: ['Product 17', 'Product 18'] },
    { name: 'Brand J', logo: 'lenovo.jpg', popularProducts: ['Product 19', 'Product 20'] }
  ];
}
