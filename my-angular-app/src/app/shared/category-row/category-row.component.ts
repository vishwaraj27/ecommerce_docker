import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-row.component.html',
})
export class CategoryRowComponent {
  categories = [
    { name: 'Mobiles', image: 'assets/categories/mobiles.png' },
    { name: 'Laptops', image: 'assets/categories/laptops.png' },
    { name: 'Fashion', image: 'assets/categories/fashion.png' },
    { name: 'Home', image: 'assets/categories/home.png' },
    { name: 'Appliances', image: 'assets/categories/appliances.png' },
    { name: 'Books', image: 'assets/categories/books.png' },
  ];
}
