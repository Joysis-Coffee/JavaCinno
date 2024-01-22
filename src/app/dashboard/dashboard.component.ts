import { Component, OnInit } from '@angular/core';
import { dashboardModel } from '../services/model/dashboard-model';
import {Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DashboardService} from "../services/dashboard.service";
import {SalesModalComponent} from "../sales/sales.modal/sales.modal.component";
import {SalesService} from "../services/sales.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private unsubscribe$ = new Subject();
  dashboard : dashboardModel[] | undefined;

  constructor(private dashboardServices: DashboardService, public dialog: MatDialog, private salesService: SalesService) {
  }

  ngOnInit(): void {
    this.dashboardServices.fetch();
    this.dashboardServices.transactions$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: dashboardModel[]) => {
        this.dashboard = data;
      });
    this.dashboardServices.refresh();

  }

  ngOnDestroy() {
    // Trigger the unsubscribe
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  viewTransactions(transactionId: number): void {
    this.salesService.getTransactionWithDetails(transactionId).subscribe(
      (dashboardData: any) => {
        this.dialog.open(SalesModalComponent, {
          data: { ...dashboardData }
        });
      },
      (error: any) => {
        console.error('Error fetching transaction details:', error);
      }
    );
  }

}
