import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {dashboardModel} from "../../services/model/dashboard-model";
import {SalesModel} from "../../services/model/sales.model";
import {SalesService} from "../../services/sales.service";

@Component({
  selector: 'app-sales.modal',
  templateUrl: './sales.modal.component.html',
  styleUrl: './sales.modal.component.css'
})
export class SalesModalComponent implements OnInit {
  displayedColumns: string[] = ['itemName', 'size', 'price', 'subtotal'];
  salesItems:  SalesModel[] | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dashboardModel,
    public dialogContent: MatDialogRef<SalesModalComponent>,
  ) {
    this.salesItems = data.salesItems;
  }


  ngOnInit(): void {

  }
}
