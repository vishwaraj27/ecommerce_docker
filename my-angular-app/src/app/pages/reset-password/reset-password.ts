import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPasswordComponent {
  newPassword = '';
  confirmPassword = '';
  message = '';
  token = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    console.log('🔑 Reset token from URL:', this.token);
  }

  validatePassword(password: string): string | null {
    if (password.length < 8)
      return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(password))
      return 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(password))
      return 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(password))
      return 'Password must contain at least one number.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return 'Password must contain at least one special character.';
    return null;
  }

  resetPassword() {
    if (!this.token) {
      this.setMessage('Invalid or expired reset link.', 'error');
      return;
    }

    const validationError = this.validatePassword(this.newPassword);
    if (validationError) {
      this.setMessage(validationError, 'error');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.setMessage('Passwords do not match!', 'error');
      return;
    }

    this.http.post(`${environment.apiUrl}/auth/reset-password`, {
      token: this.token,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        this.setMessage(res.message || 'Password reset successful!', 'success');
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        this.setMessage(err.error?.message || 'Invalid or expired reset link.', 'error');
      }
    });
  }

  setMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
  }
}
