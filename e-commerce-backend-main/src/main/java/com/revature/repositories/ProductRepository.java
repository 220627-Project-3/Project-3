package com.revature.repositories;

import com.revature.models.Product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public Optional<List<Product>> findByNameContainingIgnoreCase(String name);
	
	public Optional<List<Product>> findByDescriptionContainingIgnoreCase(String description);

	public Optional<List<Product>> findByDescriptionContainingOrNameContaining(String seachTerm, String searchTerm);
	
}
