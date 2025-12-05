import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<number>();

  constructor(private router: Router) {}

  handleAddToCart(id?: number, event?: MouseEvent) {
    event?.stopPropagation(); // Prevent navigation when adding to cart
    if (id) this.addToCart.emit(id);
  }

  goToProductDetails(product: Product) {
    if (!product.id) return;

    // ✅ Use product.category if available, otherwise default to 'general'
    const category = product.category?.slug || 'general';
    this.router.navigate(['/products', category, product.id]);
  }
}
