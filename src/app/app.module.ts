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

@NgModule({
  declarations: [AppComponent, HomeComponent, SidebarComponent, PosComponent, DashboardComponent, QueeingComponent, CashierComponent,TestComponent],
  imports: [BrowserModule, AppRoutingModule, CategoryModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
