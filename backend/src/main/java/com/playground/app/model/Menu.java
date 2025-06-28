package com.playground.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "menu")
@Getter
@Setter
@ToString
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private int price;

    @Column(nullable = false)
    private boolean status = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Menu() {
    }

    public Menu(String name, int price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return price == menu.price && status == menu.status && Objects.equals(id, menu.id) && Objects.equals(name, menu.name) && Objects.equals(createdAt, menu.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price, status, createdAt);
    }
}