import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './category/index/index.component';
import {SidebarComponent} from "./utils/sidebar/sidebar.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CashierComponent} from "./cashier/cashier.component";
import {PosComponent} from "./pos/pos.component";
import {QueeingComponent} from "./queeing/queeing.component";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {TestComponent} from "./test/test/test.component";
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [

  { path: '', component : AppComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pos', component: PosComponent },
      { path: 'queeing', component: QueeingComponent },
      { path: 'test', component: TestComponent },
      { path: 'landing_page', component: LandingPageComponent },


    ],
},

  { path: '', component: SidebarComponent,
    children: [
      { path: 'category/index', component: IndexComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'cashier', component: CashierComponent},
    ]
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
