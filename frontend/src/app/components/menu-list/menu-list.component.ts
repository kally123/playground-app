import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  newMenu: Menu = { name: '', price: 0, status: false , size: '' };
  editingMenu: Menu | null = null;
  loading = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.loading = true;
    this.menuService.getAllMenus().subscribe({
      next: (menus) => {
        this.menus = menus;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading menus:', error);
        this.loading = false;
      }
    });
  }

  createMenu(): void {
    if (this.newMenu.name.trim()) {
      this.menuService.createMenu(this.newMenu).subscribe({
        next: (menu) => {
          this.menus.push(menu);
          this.newMenu = { name: '', price: 0, status: false , size: ''};
        },
        error: (error) => console.error('Error creating Menu Item :', error)
      });
    }
  }

  startEdit(menu: Menu): void {
    this.editingMenu = { ...menu };
  }

  cancelEdit(): void {
    this.editingMenu = null;
  }

  updateMenu(): void {
    if (this.editingMenu && this.editingMenu.id) {
      this.menuService.updateMenu(this.editingMenu.id, this.editingMenu).subscribe({
        next: (updatedMenu) => {
          const index = this.menus.findIndex(t => t.id === updatedMenu.id);
          if (index !== -1) {
            this.menus[index] = updatedMenu;
          }
          this.editingMenu = null;
        },
        error: (error) => console.error('Error updating Menu Item :', error)
      });
    }
  }

  deleteMenu(id: number): void {
    if (confirm('Are you sure you want to delete this Menu Item?')) {
      this.menuService.deleteMenu(id).subscribe({
        next: () => {
          this.menus = this.menus.filter(t => t.id !== id);
        },
        error: (error) => console.error('Error deleting Menu Item :', error)
      });
    }
  }

  toggleActive(menu: Menu): void {
    if (menu.id) {
      const updatedMenu = { ...menu, status: !menu.status };
      this.menuService.updateMenu(menu.id, updatedMenu).subscribe({
        next: (updated) => {
          const index = this.menus.findIndex(t => t.id === updated.id);
          if (index !== -1) {
            this.menus[index] = updated;
          }
        },
        error: (error) => console.error('Error toggling Menu Item :', error)
      });
    }
  }
}