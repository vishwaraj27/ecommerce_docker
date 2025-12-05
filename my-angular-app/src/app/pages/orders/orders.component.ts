import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;

    this.orderService.getMyOrders().subscribe({
      next: (res) => {
        // Sort: Newest first
        this.orders = res.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewOrder(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }
}
