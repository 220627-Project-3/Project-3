package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.CartItem;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.repositories.CartRepository;



@Service
public class CartItemService {



    private final CartRepository cartRepository;

    @Autowired
    public CartItemService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

  
    public List<CartItem> findByUser(User user){
        return cartRepository.findByUser(user);
    }

 
    public boolean addProduct(Product product, User user){
        try {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setUser(user);
            cartRepository.save(newItem);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteCartItem(int CartItemId){
        try {
            cartRepository.deleteById(CartItemId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return false;
    }

}

