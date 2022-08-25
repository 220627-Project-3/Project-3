package com.revature.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemQuantityDTO {

	private int quantity;
	private int productId;
	
}
