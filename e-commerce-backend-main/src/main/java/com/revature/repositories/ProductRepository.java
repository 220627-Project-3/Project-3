package com.revature.repositories;

import com.revature.models.Product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public Optional<List<Product>> findByNameContaining(String name);
	
	// For searching by partial match (similar to SQL LIKE command) 
	public Optional<List<Product>> findByDescriptionContaining(String description);
	
	// Searching for a match in either column
	@Query(value = "SELECT * FROM product WHERE description = :searchWord OR name = :searchWord OR id = :searchWord;", nativeQuery = true)
	public List<Product> findByAny(String searchWord);
	
//	@Query(value = "UPDATE productimage SET product_image = :productImage WHERE product_id = :id", nativeQuery = true)
	
	
}
