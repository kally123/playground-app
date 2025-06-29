import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { MenuDto } from '../models/menudto.model';
import { CustomerMenu } from '../models/customermenu.model';
import { CustomerBill } from '../models/customerbill.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  addMenuToCustomer(id: number, menuDto: MenuDto): Observable<CustomerMenu> {
    return this.http.put<CustomerMenu>(`${this.apiUrl}/${id}/addmenu`, menuDto);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCustomersByStatus(completed: boolean): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/status/${completed}`);
  }

  getCustomerBillById(id: number): Observable<CustomerBill> {
    return this.http.get<CustomerBill>(`${this.apiUrl}/${id}/bill`);
  }

}