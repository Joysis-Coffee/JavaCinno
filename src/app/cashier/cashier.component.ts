import { Component } from '@angular/core';
import {cashierTable} from "./cashier.table";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent {

  cashierTable : cashierTable[] | undefined;

  ngOnInit(): void {
    this.cashierTable = this.getcashierTable();
  }

  getcashierTable(): cashierTable[] {
    let mockcashierTable: cashierTable[] = [
      {
        id: 1,
        username: "dnluz",
        fullname: "Dave Nielsen D. Luz",
        password: "dave123",
      },{
        id: 2,
        username: "dnluz",
        fullname: "Dave Nielsen D. Luz",
        password: "dave123",
      },
      {
        id: 3,
        username: "dnluz",
        fullname: "Dave Nielsen D. Luz",
        password: "dave123",
      },
      ];
    return mockcashierTable;
  }


}