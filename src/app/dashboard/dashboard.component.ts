import { Component, OnInit } from '@angular/core';
import { dashboardModel } from './dashboard-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  model : dashboardModel[] | undefined;

  ngOnInit(): void {
    this.model = this.getData();
  }
  getData(): dashboardModel[] {
    const data: dashboardModel[] = [
      {
        id: 1,
        transaction_id: 1,
        date: "1/19/2024",
        time: "2:01 PM",
        cashier: "Carl",
        name: "Joseph",
        total: 3,
      },
      // Add more objects as needed
    ];

    return data;
  }
}
