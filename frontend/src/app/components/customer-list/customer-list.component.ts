import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { name: '', mobile: '', completed: false };
  editingCustomer: Customer | null = null;
  loading = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.loading = false;
      }
    });
  }

  createCustomer(): void {
    if (this.newCustomer.name.trim()) {
      this.customerService.createCustomer(this.newCustomer).subscribe({
        next: (customer) => {
          this.customers.push(customer);
          this.newCustomer = { name: '', mobile: '', completed: false };
        },
        error: (error) => console.error('Error creating customer:', error)
      });
    }
  }

  startEdit(customer: Customer): void {
    this.editingCustomer = { ...customer };
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  updateCustomer(): void {
    if (this.editingCustomer && this.editingCustomer.id) {
      this.customerService.updateCustomer(this.editingCustomer.id, this.editingCustomer).subscribe({
        next: (updatedCustomer) => {
          const index = this.customers.findIndex(t => t.id === updatedCustomer.id);
          if (index !== -1) {
            this.customers[index] = updatedCustomer;
          }
          this.editingCustomer = null;
        },
        error: (error) => console.error('Error updating customer:', error)
      });
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter(t => t.id !== id);
        },
        error: (error) => console.error('Error deleting customer:', error)
      });
    }
  }

  toggleComplete(customer: Customer): void {
    if (customer.id) {
      const updatedCustomer = { ...customer, completed: !customer.completed };
      this.customerService.updateCustomer(customer.id, updatedCustomer).subscribe({
        next: (updated) => {
          const index = this.customers.findIndex(t => t.id === updated.id);
          if (index !== -1) {
            this.customers[index] = updated;
          }
        },
        error: (error) => console.error('Error toggling customer:', error)
      });
    }
  }
}