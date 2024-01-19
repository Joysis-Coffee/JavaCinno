import { Component } from '@angular/core';
import {cashierModel} from "../services/model/cashier-model";
import {CashierService} from "../services/cashier.service.service";
import {Subject, takeUntil} from "rxjs";
import {ProductModel} from "../services/model/product-model";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent {
  private unsubscribe$ = new Subject();
  cashier : cashierModel[] | undefined;

  constructor(private cashierService: CashierService) {
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




}
