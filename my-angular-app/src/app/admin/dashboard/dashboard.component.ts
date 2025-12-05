import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: any = {
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    todayOrders: 0,
    lowStock: 0
  };

  recentOrders: any[] = [];

  loading = true;

  constructor(private dash: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dash.getSummary().subscribe((data: any) => {
      this.stats = data;
      this.loading = false;
    });

    this.dash.getRecentOrders().subscribe((data: any) => {
      this.recentOrders = data;
    });
  }
}
