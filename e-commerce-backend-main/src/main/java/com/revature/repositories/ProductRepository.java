package com.revature.repositories;

import com.revature.models.Product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	 public Optional<List<Product>> findByName(String name);

}
