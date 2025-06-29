package com.playground.app.controller;

import com.playground.app.model.Customer;
import com.playground.app.model.Menu;
import com.playground.app.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }


    @GetMapping("/all")
    public Page<Menu> findAll(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return menuService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        return menuService.getMenuById(id)
                .map(Menu -> ResponseEntity.ok().body(Menu))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Menu createMenu(@RequestBody Menu Menu) {
        return menuService.createMenu(Menu);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu MenuDetails) {
        try {
            Menu updatedMenu = menuService.updateMenu(id, MenuDetails);
            return ResponseEntity.ok(updatedMenu);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{active}")
    public List<Menu> getMenusByStatus(@PathVariable boolean status) {
        return menuService.getMenuByStatus(status);
    }
    @PostMapping("/import")
        public ResponseEntity<String> importMenusFromFile(@RequestParam("file") MultipartFile file) {
            try {
                menuService.importMenus(file);
                return ResponseEntity.ok("Menus imported successfully.");
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Failed to import menus: " + e.getMessage());
            }
        }
}