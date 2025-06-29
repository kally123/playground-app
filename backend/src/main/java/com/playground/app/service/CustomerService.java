package com.playground.app.service;

import com.playground.app.dto.CustomerBill;
import com.playground.app.dto.MenuBillDto;
import com.playground.app.dto.MenuDto;
import com.playground.app.model.Customer;
import com.playground.app.model.CustomerMenu;
import com.playground.app.model.Menu;
import com.playground.app.repository.CustomerMenuRepository;
import com.playground.app.repository.CustomerRepository;
import com.playground.app.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMenuRepository customerMenuRepository;
    private final MenuRepository menuRepository;

    public Page<Customer> findAll(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

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
        customer.setExitAt(LocalDateTime.now());

        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public List<Customer> getCustomersByStatus(boolean completed) {
        return customerRepository.findByCompletedOrderByCreatedAtDesc(completed);
    }

    public CustomerMenu addMenuToCustomer(Long id, MenuDto menuDto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        CustomerMenu customerMenu = menuDto.toCustomerMenu(customer);
        customerMenu.setCustomerId(customer.getId());
        customerMenu.setSize(menuDto.getSize());
        customerMenuRepository.save(customerMenu);

        return customerMenu;
    }

    public CustomerBill getCustomerBillById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        List<CustomerMenu> customerMenus = customerMenuRepository.findByCustomerId(customer.getId());
        Map<Long, Menu> menuMap = menuRepository.findAllById(customerMenus.stream().map(CustomerMenu::getMenuId).toList()).stream()
                .collect(Collectors.toMap(Menu::getId, menu -> menu));
        double totalAmount = customerMenus.stream()
                .mapToDouble(menu -> menu.getQuantity() * menuMap.get(menu.getMenuId()).getPrice())
                .sum();
        List<MenuBillDto> billItems = customerMenus.stream()
                .map(menu -> new MenuBillDto(menu.getId(), menuMap.get(menu.getMenuId()).getName(),
                        menuMap.get(menu.getMenuId()).getPrice(),
                        menu.getQuantity(), menu.getSize())).toList();
        return new CustomerBill(customer.getId(), customer.getName(), totalAmount, customer.getCreatedAt(), customer.getExitAt(), billItems);
    }

    public Customer toggleCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        customer.setCompleted(!customer.isCompleted());
        customer.setExitAt(LocalDateTime.now());
        return customerRepository.save(customer);
    }

}