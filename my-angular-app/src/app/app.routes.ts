import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { AuthGuard } from './services/auth.guard';
import { CartComponent } from './cart/cart.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressManagementComponent } from './pages/address-management/address-management.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AdminGuard } from './services/admin.guard';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'products/:category', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/:category/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'addresses', component: AddressManagementComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },

  // ⭐ Lazy loaded Order Details
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./pages/order-details/order-details.component')
        .then(m => m.OrderDetailsComponent),
    canActivate: [AuthGuard]
  },

  // ⭐ Lazy loaded Checkout Page
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component')
        .then(m => m.CheckoutComponent),
    canActivate: [AuthGuard]
  },

  {
  path: 'order-confirmation/:id',
  loadComponent: () =>
    import('./pages/order-confirmation/order-confirmation.component')
      .then(m => m.OrderConfirmationComponent),
  canActivate: [AuthGuard]
   } ,
   
   // ⭐ Admin routes (standalone + lazy)
   {
  path: 'admin',
  canActivate: [AuthGuard, AdminGuard],
  loadChildren: () =>
    import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },


  { path: '**', redirectTo: '' }
];
