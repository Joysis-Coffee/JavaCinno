import { Time } from "@angular/common";
import {cashierModel} from "./cashier-model";
import {SalesModel} from "./sales.model";

export interface dashboardModel {
  id: number;
  cashier: cashierModel;
  transactionDate: Date;
  cash: number;
  customer_name: string;
  change_amount: string;
  time_served: string;
  status: boolean;
  total: number;
  salesItems?: SalesModel[];
}
