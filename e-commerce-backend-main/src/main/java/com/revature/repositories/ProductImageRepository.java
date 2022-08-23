package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.revature.models.ProductImage;
import com.revature.projections.ProductImageProjection;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
	ProductImage findByProduct_Id(int productId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE productimage SET product_image = :productImage WHERE product_id = :id", nativeQuery = true)
	public int updateProductImage(@Param("id") int id, @Param("productImage") byte[] productImage);

	public List<ProductImageProjection> findAllByProduct_Id(int productId);

}