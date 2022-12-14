package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.repositories.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }
    

    public Optional<List<Product>> findByDescriptionContainingIgnoreCase(String description) {
    	return productRepository.findByDescriptionContainingIgnoreCase(description);
    }
    
    public Optional <List<Product>> findByAny(String searchTerm) {
    	return productRepository.findByDescriptionContainingIgnoreCaseOrNameContainingIgnoreCase(searchTerm, searchTerm);
    }
    

    public Optional<List<Product>> findByNameContainingIgnoreCase(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
    
    public Product save(Product product) {
        return productRepository.save(product);
    }
    
    public List<Product> saveAll(List<Product> productList, List<ProductInfo> metadata) {
    	return productRepository.saveAll(productList);
    }

    public void delete(int id) {
        productRepository.deleteById(id);
    }
}
