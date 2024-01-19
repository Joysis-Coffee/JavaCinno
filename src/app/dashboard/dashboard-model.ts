import { Time } from "@angular/common";

export interface dashboardModel {
  id: number;
  transaction_id: number;
  date: string;
  time: string;
  cashier: string;
  name: string;
  total: number;
}