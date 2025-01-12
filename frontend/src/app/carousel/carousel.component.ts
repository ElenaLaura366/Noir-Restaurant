import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: string[] = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png'
  ];
  currentIndex: number = 0;
  private slideInterval: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    if (this.isBrowser) {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 4000);
    }
  }

  stopAutoSlide() {
    if (this.isBrowser && this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  prevSlide() {
    this.stopAutoSlide();
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToSlide(index: number) {
    this.stopAutoSlide();
    this.currentIndex = index;
    this.startAutoSlide();
  }
}