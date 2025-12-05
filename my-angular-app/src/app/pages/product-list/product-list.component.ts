import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { ProductGridComponent } from '../../shared/product-grid/product-grid.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductGridComponent],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  category = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.loadProducts();
    });
  }

  loadProducts() {
  this.loading = true;
  this.productService.getAll().subscribe({
    next: (data) => {
      // ✅ Filter products by category (case-insensitive)
      this.filteredProducts = data.filter(p =>
        (p.category?.slug || '').toLowerCase() === this.category.toLowerCase()
      );

      console.log('All products:', data);
      console.log('Filtered products:', this.filteredProducts);

      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load products', err);
      this.loading = false;
    }
  });
}


  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe({
      next: () => alert('✅ Added to cart!'),
      error: (err) => alert('❌ Failed to add to cart')
    });
  }
  goHome() {
    this.router.navigate(['/home']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  viewProduct(productId: number) {
    this.router.navigate([`/products/${this.category}/${productId}`]);
  }
}
