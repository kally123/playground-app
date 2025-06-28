package com.playground.app.service;

import com.playground.app.model.Customer;
import com.playground.app.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    public List<Customer> findTodaysCustomers() {
        return customerRepository.findTodaysCustomers();
    }
    
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }
    
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    
    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        
        customer.setName(customerDetails.getName());
        customer.setMobile(customerDetails.getMobile());
        customer.setCompleted(customerDetails.isCompleted());
        
        return customerRepository.save(customer);
    }
    
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
    
    public List<Customer> getCustomersByStatus(boolean completed) {
        return customerRepository.findByCompletedOrderByCreatedAtDesc(completed);
    }
}