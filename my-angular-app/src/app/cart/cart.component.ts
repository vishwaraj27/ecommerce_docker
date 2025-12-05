import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = true;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }
  goHome() {
    this.router.navigate(['/home']);
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.loading = false;
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/']);
        }
      },
    });
  }

  increaseQuantity(item: CartItem) {
    const newQty = item.quantity + 1;
    this.cartService.updateQuantity(item.product.id!, newQty).subscribe({
      next: () => this.loadCart(),
    });
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      this.cartService.updateQuantity(item.product.id!, newQty).subscribe({
        next: () => this.loadCart(),
      });
    } else {
      this.removeItem(item.product.id!);
    }
  }

  removeItem(productId: number) {
    if (confirm('Remove this item from cart?')) {
      this.cartService.removeFromCart(productId).subscribe({
        next: () => this.loadCart(),
      });
    }
  }

  clearCart() {
    if (confirm('Clear all items from cart?')) {
      this.cartService.clearCart().subscribe({
        next: () => this.loadCart(),
      });
    }
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (Number(item.product?.price) || 0) * (item.quantity || 0),
      0
    );
  }

 checkout() {
  if (this.cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  this.router.navigate(['/checkout']);
}
}
