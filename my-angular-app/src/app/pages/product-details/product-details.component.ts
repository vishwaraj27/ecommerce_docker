import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  category = '';
  productId!: number;
  product!: Product;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public router: Router
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct() {
  this.productService.getById(this.productId).subscribe({
    next: (data) => {
      this.product = data;

      // 🔥 FIX: use backend category slug
      this.category = data.category?.slug || this.category;

      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load product', err);
      this.loading = false;
    }
  });
}


  addToCart() {
    this.cartService.addToCart(this.productId).subscribe({
      next: () => alert('✅ Added to cart!'),
      error: () => alert('❌ Failed to add to cart')
    });
  }

  buyNow() {
  this.cartService.addToCart(this.productId).subscribe({
    next: () => {
      // ➤ only navigate AFTER product is added
      this.router.navigate(['/cart']);
    },
    error: () => alert('❌ Failed to add to cart')
  });
}
}
