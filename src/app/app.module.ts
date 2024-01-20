import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CategoryModule } from './category/category.module';
import { HomeComponent } from './home/home.component';
import {SidebarComponent} from "./utils/sidebar/sidebar.component";
import {PosComponent} from "./pos/pos.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {QueeingComponent} from "./queeing/queeing.component";
import {CashierComponent} from "./cashier/cashier.component";
import {TestComponent} from "./test/test/test.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatCommonModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import {CreateCashierComponent} from "./cashier/create-cashier/create-cashier.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CashierService} from "./services/cashier.service";
import {UpdateCashierComponent} from "./cashier/update-cashier/update-cashier.component";
import {SalesModalComponent} from "./sales/sales.modal/sales.modal.component";
import {MatTable, MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [AppComponent, HomeComponent, SidebarComponent, PosComponent, DashboardComponent, QueeingComponent, CashierComponent,TestComponent, CreateCashierComponent, UpdateCashierComponent, SalesModalComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    CategoryModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule, MatTable,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
