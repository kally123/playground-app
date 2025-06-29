package com.playground.app.repository;

import com.playground.app.model.CustomerMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerMenuRepository extends JpaRepository<CustomerMenu, Long> {

    List<CustomerMenu> findByCustomerId(Long id);
}