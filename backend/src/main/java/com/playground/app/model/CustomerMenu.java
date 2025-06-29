package com.playground.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "customermenu")
@Getter
@Setter
@ToString
public class CustomerMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private Long menuId;

    private int quantity;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private MenuSize size;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public CustomerMenu() {
    }

    public CustomerMenu(Long customerId, Long menuId, int quantity) {
        this.customerId = customerId;
        this.menuId = menuId;
        this.quantity = quantity;
    }
}