import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

// Subcomponents
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { HeroBannerComponent } from '../shared/hero-banner/hero-banner.component';
import { ProductGridComponent } from '../shared/product-grid/product-grid.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroBannerComponent,
    ProductGridComponent,
    FooterComponent
  ],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  categories = [
    { id: 'spices',    name: 'Spices & Masalas',     image: 'assets/images/spices.webp' },
    { id: 'oils',      name: 'Healthy Oils',         image: 'assets/images/oils.webp' },
    { id: 'nuts',      name: 'Nuts & Dry Fruits',    image: 'assets/images/nuts.webp' },
    { id: 'healthmix', name: 'Health Mixes',         image: 'assets/images/healthmix.webp' },
  ];

  username: string = '';
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    // Redirect if not logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.username = this.authService.getUsername();
    }
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        // ✅ safely handle missing 'featured' property
        this.products = data.filter(p => (p as any).featured !== false);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.loading = false;
      },
    });
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/products', categoryId]);
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe({
      next: () => alert('✅ Added to cart!'),
      error: () => alert('❌ Failed to add to cart'),
    });
  }

  // ✅ Search handler from Navbar
  onSearch(query: string) {
    const q = query.toLowerCase().trim();

    // Filter the products based on name or description
    this.products = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    // Optionally, if you want to show all products again when search is cleared:
    if (!q) {
      this.loadProducts();
    }
  }

  logout() {
    this.authService.logout();
  }
}
