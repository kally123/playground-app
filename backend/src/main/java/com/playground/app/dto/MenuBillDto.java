package com.playground.app.dto;

import com.playground.app.model.MenuSize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuBillDto extends MenuDto {
    private Long menuId;
    private String menuName;
    private int price;
    private int quantity;
    private MenuSize size;

}
