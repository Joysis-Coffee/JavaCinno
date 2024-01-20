import { Component } from '@angular/core';
import {cashierModel} from "../services/model/cashier-model";
import {CashierService} from "../services/cashier.service";
import {Subject, takeUntil} from "rxjs";
import {ProductModel} from "../services/model/product-model";
import {CreateCashierComponent} from "./create-cashier/create-cashier.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateCashierComponent} from "./update-cashier/update-cashier.component";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent {
  private unsubscribe$ = new Subject();
  cashier : cashierModel[] | undefined;

  constructor(private cashierService: CashierService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cashierService.fetchCategories();
    this.cashierService.cashiers$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: cashierModel[]) => {
        this.cashier = data;
      });
    this.cashierService.refreshCategoriesList();
  }

  ngOnDestroy() {
    // Trigger the unsubscribe
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }


  addCashier() {
    const  dialogRef = this.dialog.open(CreateCashierComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cashierService.refreshCategoriesList();
    });

    }

  updateCahsier(data: cashierModel) {
    const  dialogRef = this.dialog.open(UpdateCashierComponent, {
      width: '600px',
      data: {...data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cashierService.refreshCategoriesList();
    });

  }

}
