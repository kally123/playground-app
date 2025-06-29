import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { Menu } from 'src/app/models/menu.model';
import { MenuDto } from 'src/app/models/menudto.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-customer-menu-items',
  templateUrl: './customer-menu-items.component.html',
  styleUrl: './customer-menu-items.component.css',
})
export class CustomerMenuItemsComponent implements OnInit {
  @Input() customer: Customer | null = null;
  menus: Menu[] = [];
  newCustomerMenu: MenuDto = { menuId: 0, quantity: 0 };
  customerMenuItems: any[] = [];
  loading = false;

  constructor(
    private menuService: MenuService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.loading = true;
    this.menuService.getAllMenus().subscribe({
      next: (menus) => {
        this.menus = menus?.filter((menu) => menu.status);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading menus:', error);
        this.loading = false;
      },
    });
  }

  createCustomerMenu(): void {
    if (this.newCustomerMenu.menuId) {
      this.customerService
        .addMenuToCustomer(this.customer?.id || 0, this.newCustomerMenu)
        .subscribe({
          next: (data) => {
            let _menu = this.menus.find((menu) => menu.id == data.menuId);
            this.customerMenuItems.push({ ..._menu, quantity: data.quantity });
            console.log('cus menu ', this.customerMenuItems);

            this.newCustomerMenu = { menuId: 0, quantity: 0 };
          },
          error: (error) =>
            console.error('Error creating customer Menu Item :', error),
        });
    }
  }
}
