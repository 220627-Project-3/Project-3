package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.revature.models.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
	ProductImage findByProduct_Id(int productId);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE productimage SET product_image = :productImage WHERE product_id = :id", nativeQuery = true)
	public int updateProductImage(int id, byte[] productImage);
}
