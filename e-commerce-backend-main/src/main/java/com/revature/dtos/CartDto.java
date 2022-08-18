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
    private int userId;
    private int quantity;
    private int productId;
    private Product product;
    
    
}

