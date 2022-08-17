package com.revature.repositories;

import com.revature.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	 public Optional<List<Product>> findByNameContaining(String name);

	
	// For searching by partial match (similar to SQL LIKE command) 
	public Optional<List<Product>> findByDescriptionContaining(String description);
	
//	public List<Product> findByNameContaining(String name);
	
//	public List<Product> findByIdContaining(String id);
	
	// Searching for a match in either column
	@Query(value = "SELECT * FROM product WHERE description = :searchWord OR name = :searchWord OR id = :searchWord;", nativeQuery = true)
	public List<Product> findByAny(String searchWord);
	
//	@Query(value = "UPDATE productimage SET product_image = :productImage WHERE product_id = :id", nativeQuery = true)
	
	
}
