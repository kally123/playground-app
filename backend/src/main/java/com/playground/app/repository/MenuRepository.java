package com.playground.app.repository;

import com.playground.app.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByStatusOrderByCreatedAtDesc(boolean status);

    List<Menu> findByNameContainingIgnoreCase(String title);
}