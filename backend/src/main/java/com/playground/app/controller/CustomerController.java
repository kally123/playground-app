package com.playground.app.controller;

import com.playground.app.dto.CustomerBill;
import com.playground.app.dto.MenuDto;
import com.playground.app.model.Customer;
import com.playground.app.model.CustomerMenu;
import com.playground.app.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> findTodaysCustomers() {
        return customerService.findTodaysCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
                .map(customer -> ResponseEntity.ok().body(customer))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/bill")
    public ResponseEntity<CustomerBill> getCustomerBillById(@PathVariable Long id) {
        CustomerBill customerBill = customerService.getCustomerBillById(id);
        return ResponseEntity.ok(customerBill);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        try {
            Customer updatedCustomer = customerService.updateCustomer(id, customerDetails);
            return ResponseEntity.ok(updatedCustomer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Customer> toggleCustomer(@PathVariable Long id) {
        try {
            Customer updatedCustomer = customerService.toggleCustomer(id);
            return ResponseEntity.ok(updatedCustomer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/addmenu")
    public ResponseEntity<CustomerMenu> addMenuToCustomer(@PathVariable Long id, @RequestBody MenuDto menuDto) {
        try {
            CustomerMenu updatedCustomerMenu = customerService.addMenuToCustomer(id, menuDto);
            return ResponseEntity.ok(updatedCustomerMenu);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{completed}")
    public List<Customer> getCustomersByStatus(@PathVariable boolean completed) {
        return customerService.getCustomersByStatus(completed);
    }
}