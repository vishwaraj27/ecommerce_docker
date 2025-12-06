import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-banner.component.html',
})
export class HeroBannerComponent implements OnInit {
  banners = [
    {
      image: 'assets/banners/spices-banner.webp',   // converted & optimized
      title: 'Authentic Indian Spices',
      subtitle: 'Handpicked from farms, bursting with aroma.',
      cta: 'Shop Spices',
      link: '/products/spices',
    },
    {
      image: 'assets/banners/oils-banner.webp',
      title: 'Cold-Pressed Oils for Health',
      subtitle: 'Pure. Natural. Traditionally Extracted.',
      cta: 'Explore Oils',
      link: '/products/oils',
    },
    {
      image: 'assets/banners/nuts-banner.webp',
      title: 'Premium Nuts & Dry Fruits',
      subtitle: 'Wholesome energy for your every day.',
      cta: 'Shop Nuts',
      link: '/products/nuts',
    },
    {
      image: 'assets/banners/healthmix-banner.webp',
      title: 'Nutritious Health Mixes',
      subtitle: 'Perfect blends for a balanced diet.',
      cta: 'Discover Mixes',
      link: '/products/healthmix',
    },
  ];

  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    }, 5000);
  }
}
