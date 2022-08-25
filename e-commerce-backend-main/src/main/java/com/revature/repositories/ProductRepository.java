package com.revature.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public Optional<List<Product>> findByNameContainingIgnoreCase(String name);
	
	public Optional<List<Product>> findByDescriptionContainingIgnoreCase(String description);

	public Optional<List<Product>> findByDescriptionContainingIgnoreCaseOrNameContainingIgnoreCase(String seachTerm, String searchTerm);
	
}
