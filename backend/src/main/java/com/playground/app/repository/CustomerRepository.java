package com.playground.app.repository;

import com.playground.app.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByCompletedOrderByCreatedAtDesc(boolean completed);
    List<Customer> findByNameContainingIgnoreCase(String title);
}