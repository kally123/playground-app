import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() customer: any = null;
  @Output() onButtonAction: EventEmitter<string> = new EventEmitter<string>();
  menus: Menu[] = [];
  newCustomerMenu: MenuDto = { menuId: 0, quantity: 1 };
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
        this.populateCustomerMenuItems();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading menus:', error);
        this.loading = false;
      },
    });
  }

  populateCustomerMenuItems(): void {
    if (this.customer?.billItems?.length > 0) {
      this.customerMenuItems = this.customer.billItems.map((item: any) => {
        let menu = this.menus.find((menu) => menu.id === item.menuId);
        return {
          ...menu,
          quantity: item.quantity,
        };
      });
      console.log('Customer Menu Items:', this.customerMenuItems);
    }
  }

  createCustomerMenu(): void {
    if (this.newCustomerMenu.menuId) {
      let _menu = this.menus.find(
        (menu) => menu.id == this.newCustomerMenu.menuId,
      );
      this.customerMenuItems.push({
        ..._menu,
        quantity: this.newCustomerMenu.quantity,
      });
      console.log('cus menu ', this.customerMenuItems);

      this.newCustomerMenu = { menuId: 0, quantity: 1 };
    }
  }

  deleteItem(_menuId: number): void {
    this.customerMenuItems = this.customerMenuItems.filter(
      (menu) => menu.id !== _menuId,
    );
  }

  submitCustomerMenu(): void {
    if (this.customerMenuItems.length > 0) {
      let billItems = this.customerMenuItems.map((item) => ({
        menuId: item.id,
        quantity: item.quantity,
      }));
      this.customerService
        .addMenuToCustomer(this.customer?.customerId, billItems)
        .subscribe({
          next: (data) => {
            console.log('Customer Menu Items added successfully:', data);
            this.onButtonAction.emit('success');
          },
          error: (error) =>
            console.error('Error creating customer Menu Item :', error),
        });
    }
  }

  closeCustomerMenu(): void {
    this.onButtonAction.emit('close');
  }
}
