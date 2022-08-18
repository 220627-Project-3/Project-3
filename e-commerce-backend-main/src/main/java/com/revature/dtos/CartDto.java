package com.revature.dtos;

import com.revature.models.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
	private int id;
    private int user_Id;
    private int quantity;
    private int product_id;
    private Product product;
    
}

