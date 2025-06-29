import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { name: '', mobile: '', completed: false };
  editingCustomer: Customer | null = null;
  selectedCustomer: any = null;
  addNewCustomer = false;
  loading = false;

  constructor(private customerService: CustomerService) {}

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
      },
    });
  }

  addNew() {
    this.newCustomer = { name: '', mobile: '', completed: false };
    this.addNewCustomer = true;
  }

  closeAddCustomer() {
    this.addNewCustomer = !this.addNewCustomer;
  }

  createCustomer(): void {
    if (this.newCustomer.name.trim()) {
      this.customerService.createCustomer(this.newCustomer).subscribe({
        next: (customer) => {
          this.customers.push(customer);
          this.addNewCustomer = false;
        },
        error: (error) => console.error('Error creating customer:', error),
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
      this.customerService
        .updateCustomer(this.editingCustomer.id, this.editingCustomer)
        .subscribe({
          next: (updatedCustomer) => {
            const index = this.customers.findIndex(
              (t) => t.id === updatedCustomer.id,
            );
            if (index !== -1) {
              this.customers[index] = updatedCustomer;
            }
            this.editingCustomer = null;
          },
          error: (error) => console.error('Error updating customer:', error),
        });
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter((t) => t.id !== id);
        },
        error: (error) => console.error('Error deleting customer:', error),
      });
    }
  }

  toggleComplete(customer: Customer): void {
    if (customer.id) {
      const updatedCustomer = { ...customer, completed: !customer.completed };
      this.customerService
        .updateCustomer(customer.id, updatedCustomer)
        .subscribe({
          next: (updated) => {
            const index = this.customers.findIndex((t) => t.id === updated.id);
            if (index !== -1) {
              this.customers[index] = updated;
            }
          },
          error: (error) => console.error('Error toggling customer:', error),
        });
    }
  }

  getCustomerBillById(customerId: number): void {
    this.customerService.getCustomerBillById(customerId).subscribe({
      next: (bill) => {
        console.log('Customer Bill:', bill);
        this.printCustomerBill(bill);
      },
      error: (error) => console.error('Error fetching customer bill:', error),
    });
  }

  printCustomerBill(bill: any): void {
    const printContents = `
      <html>
        <head>
          <title>Customer Bill</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h2 { margin-bottom: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f5f5f5; }
            .total { font-size: x-large; font-weight: bold; text-align: right; }
          </style>
        </head>
        <body>
          <h2>Customer Bill</h2>
          <p><strong>Name:</strong> ${bill.customerName}</p>
          <p><strong>Started At:</strong> ${
            bill.startedAt ? new Date(bill.startedAt).toLocaleString() : '-'
          }</p>
          <p><strong>Exited At:</strong> ${
            bill.exitedAt ? new Date(bill.exitedAt).toLocaleString() : '-'
          }</p>
          <table>
            <thead>
              <tr>
                <th>Menu Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${bill.billItems
                .map(
                  (item: any) => `
                <tr>
                  <td>${item.menuName}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          <p class="total">Total Amount: ₹${bill.totalAmount}</p>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContents);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  }

  addMenuToCustomer(customer: Customer): void {
    console.log('Adding menu to customer:', customer);
    this.customerService.getCustomerBillById(customer.id!).subscribe({
      next: (bill) => {
        console.log('Customer Bill:', bill);
        this.selectedCustomer = bill;
      },
      error: (error) => {
        this.selectedCustomer = {
          customerId: customer.id,
          customerName: customer.name,
          billItems: [],
        };
        console.error('Error fetching customer bill:', error);
      },
      complete: () => {
        console.log('Completed fetching customer bill', this.selectedCustomer);
      },
    });
  }

  onCustomerMenuAction(event: any): void {
    console.log('Customer Menu Action:', event);
    if (event === 'close') {
      this.selectedCustomer = null;
    } else {
      this.selectedCustomer = null;
    }
  }
}
