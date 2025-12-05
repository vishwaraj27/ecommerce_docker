import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  templateUrl: './order-details.component.html',
  imports: [CommonModule]
})
export class OrderDetailsComponent { 
  order: any = null;
  address: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadOrder(id);
    this.loadAddress();
  }

  loadOrder(id: number) {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.order = orders.find((o: any) => o.id === id) || null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.order = null;
      }
    });
  }

  loadAddress() {
    this.userService.getMe().subscribe({
      next: (user) => {
        // user.defaultAddress is returned from backend
        this.address = user.defaultAddress || null;
      },
      error: () => {
        this.address = null;
      }
    });
  }

  back() {
    this.router.navigate(['/orders']);
  }
}
