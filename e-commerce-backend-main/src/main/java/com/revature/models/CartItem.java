package com.revature.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="cart")
public class CartItem {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	

    @ManyToOne(targetEntity = Product.class)
    @JoinColumn(name = "product_id", nullable = false, unique = false, referencedColumnName = "id")
    private Product product;


    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", nullable = false, unique = false, referencedColumnName = "id")

    private User user;



	private int quantity;
	

}