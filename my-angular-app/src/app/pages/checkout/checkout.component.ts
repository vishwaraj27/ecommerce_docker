import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  addresses: any[] = [];
  selectedAddressId: number | null = null;

  cartItems: any[] = [];
  itemsTotal = 0;
  tax = 0;
  shippingFee = 40;
  grandTotal = 0;

  showAddressForm = false;
  newAddress: any = {};

  paymentMethod = "COD";
  loading = false;

  constructor(
    private addressService: AddressService,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadAddresses();
    this.loadCart();
  }

  loadAddresses() {
    this.addressService.list().subscribe({
      next: (res: any[]) => {
        this.addresses = res;
        const def = res.find(a => a.isDefault);
        if (def) this.selectedAddressId = def.id;
      }
    });
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any[]) => {
        this.cartItems = res;
        this.itemsTotal = res.reduce(
          (sum, c) => sum + c.product.price * c.quantity,
          0
        );

        this.tax = Math.round(this.itemsTotal * 0.05);
        this.calculateTotals();
      }
    });
  }

  calculateTotals() {
    this.grandTotal = this.itemsTotal + this.tax + this.shippingFee;
  }

  saveNewAddress() {
    this.addressService.create(this.newAddress).subscribe({
      next: () => {
        this.showAddressForm = false;
        this.newAddress = {};
        this.loadAddresses();
      }
    });
  }

  placeOrder() {
  if (!this.selectedAddressId) {
    alert("❗ Please select a delivery address");
    return;
  }

  const token = this.auth.getToken();
  if (!token) {
    alert("Session expired. Please log in again.");
    this.router.navigate(['/']);
    return;
  }

  this.loading = true;

  const payload = {
    addressId: this.selectedAddressId,
    paymentMethod: this.paymentMethod,
    itemsTotal: this.itemsTotal,
    tax: this.tax,
    shippingFee: this.shippingFee,
    grandTotal: this.grandTotal
  };

  this.http.post(
    `${environment.apiUrl}/orders/checkout`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  ).subscribe({
    next: (order: any) => {
      this.loading = false;
      this.router.navigate(['/order-confirmation', order.id]);  // ✅ FIXED
    },
    error: (err) => {
      this.loading = false;
      console.error(err);
      alert("❌ Checkout failed. Try again.");
    }
  });
  }

}
