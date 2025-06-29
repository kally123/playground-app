package com.playground.app.service;

import com.playground.app.model.Customer;
import com.playground.app.model.Menu;
import com.playground.app.model.MenuCategory;
import com.playground.app.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.hibernate.internal.util.StringHelper.isNotEmpty;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Page<Menu> findAll(Pageable pageable) {
        return menuRepository.findAll(pageable);
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

    public void importMenus(MultipartFile file) {
        try {
            List<String> lines = new BufferedReader(new InputStreamReader(file.getInputStream()))
                    .lines().collect(Collectors.toList());
            lines.remove(0); // Remove header line if present
            for (String line : lines) {
                // Assuming CSV: name,price
                String[] parts = line.split(",");
                if (parts.length >= 2) {
                    Menu menu = new Menu();
                    menu.setName(parts[0].trim());
                    menu.setPrice(getprice(parts));
                    menu.setCategory(parts.length > 3 ? MenuCategory.valueOf(parts[4].trim()) : MenuCategory.Mojito);
                    createMenu(menu);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to import menus: " + e.getMessage(), e);
        }
    }

    private int getprice(String[] parts) {
        String pricePart = parts[1].trim();
        try {
            if (isNotEmpty(parts[2])) {
                pricePart = parts[2].trim();
            } else if (isNotEmpty(parts[3])) {
                pricePart = parts[3].trim();
            }

            return Integer.parseInt(pricePart);
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid price format: " + parts[1]);
        }
    }

}