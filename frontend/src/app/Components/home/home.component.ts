import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentSlide = 0;
  totalSlides = 3;

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
}
