import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { name: 'Inventory', icon: 'fa-solid fa-cart-flatbed', active: false , link: '/category/index'},
    { name: 'Dashboard', icon: 'fa-solid fa-chart-line', active: false, link: '/dashboard' },
    { name: 'Cashier', icon: 'fa-solid fa-user-large', active: false , link: '/cashier'},
    { name: 'Point of Sale', icon: 'fa-solid fa-money-bill', active: false , link: '/pos'},
    { name: 'Queeing', icon: 'fa-solid fa-hourglass-start', active: false , link: '/queeing'},
  ];


  setActive(item: { active: boolean; }): void {
    this.menuItems.forEach((i) => i.active = false);
    item.active = true;
  }
}
