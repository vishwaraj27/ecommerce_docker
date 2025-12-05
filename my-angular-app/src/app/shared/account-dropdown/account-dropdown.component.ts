import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css']
})
export class AccountDropdownComponent implements OnInit {
  open = false;
  username = 'User';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername();
  }

  toggle() {
    this.open = !this.open;
  }

  go(path: string) {
    this.open = false;
    this.router.navigateByUrl(path);
  }

  logout() {
    this.auth.logout();
  }
}
