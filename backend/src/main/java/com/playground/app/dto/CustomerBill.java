package com.playground.app.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerBill {
    private Long customerId;
    private String customerName;
    private double totalAmount;
    private LocalDateTime startedAt;
    private LocalDateTime exitedAt;
    private List<MenuBillDto> billItems;
}
