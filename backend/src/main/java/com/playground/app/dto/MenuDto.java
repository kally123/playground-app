package com.playground.app.dto;

import com.playground.app.model.Customer;
import com.playground.app.model.CustomerMenu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuDto {
    private Long menuId;
    private int quantity;

    public CustomerMenu toCustomerMenu(Customer customer) {
        CustomerMenu customerMenu = new CustomerMenu();
        customerMenu.setCustomerId(customer.getId());
        customerMenu.setMenuId(this.menuId);
        customerMenu.setQuantity(this.quantity);

        return customerMenu;
    }
}
