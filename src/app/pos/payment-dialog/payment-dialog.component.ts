import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css'
})
export class PaymentDialogComponent {
  customerName: string | undefined;
  cashAmount: number | undefined;

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>) {}

}
