import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent implements OnInit {

  order: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/home']);
      return;
    }
    this.loadOrder(id);
  }

  loadOrder(id: string) {
    const token = this.auth.getToken();

    this.http.get(`${environment.apiUrl}/orders/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).subscribe({
      next: (res: any) => {
        this.order = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert("Unable to fetch order details");
        this.router.navigate(['/home']);
      }
    });
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
