package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.dtos.CartItemQuantityDTO;
import com.revature.models.CartItem;
import com.revature.models.User;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByUser(User user);
    List<CartItem> deleteByProduct_IdAndUserId(int productId, int userID);
    CartItem findByProduct_IdAndUser_Id(int productId, int userId);
    
}