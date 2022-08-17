package com.revature.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.ProductImage;
import com.revature.repositories.ProductImageRepository;

@Service
public class ProductImageService {
	private final ProductImageRepository productImageRepository;

    public ProductImageService(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    public Optional<ProductImage> findById(int id) {
        return productImageRepository.findById(id);
    }

    public ProductImage save(ProductImage ProductImage) {
        return productImageRepository.save(ProductImage);
    }

    public void delete(int id) {
    	productImageRepository.deleteById(id);
    }
    
}
