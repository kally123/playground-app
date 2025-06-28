package com.playground.app.service;

import com.playground.app.model.Menu;
import com.playground.app.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Optional<Menu> getMenuById(Long id) {
        return menuRepository.findById(id);
    }

    public Menu createMenu(Menu menu) {
        menu.setStatus(true);
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Long id, Menu menuDetails) {
        Menu customer = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        customer.setName(menuDetails.getName());
        customer.setStatus(menuDetails.isStatus());
        customer.setPrice(menuDetails.getPrice());

        return menuRepository.save(customer);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }

    public List<Menu> getMenuByStatus(boolean status) {
        return menuRepository.findByStatusOrderByCreatedAtDesc(status);
    }
}