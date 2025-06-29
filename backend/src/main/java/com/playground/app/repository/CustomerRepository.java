package com.playground.app.repository;

import com.playground.app.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByCompletedOrderByCreatedAtDesc(boolean completed);
    List<Customer> findByNameContainingIgnoreCase(String title);

    @Query("SELECT c FROM Customer c WHERE CAST(c.createdAt AS date) = CURRENT_DATE ORDER BY c.createdAt DESC")
    List<Customer> findTodaysCustomers();
}