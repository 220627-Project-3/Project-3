package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.revature.dtos.CartItemQuantityDTO;
import com.revature.models.CartItem;
import com.revature.models.User;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByUser(User user);
    List<CartItem> deleteByProduct_IdAndUserId(int productId, int userID);
    CartItem findByProduct_IdAndUser_Id(int productId, int userId);
    List<CartItem> findByUser_Id(int id);
    
    @Transactional
	@Modifying
	@Query(value = "DELETE FROM cart WHERE user_id = :userId", nativeQuery = true)
	public int deleteCartItems(@Param("userId") int id);
    
    @Transactional
	@Modifying
	@Query(value = "DELETE FROM cart WHERE user_id = :userId AND product_id = :productId", nativeQuery = true)
	public int deleteSingleCartItem(@Param("userId") int uid, @Param("productId") int pid);
    
    @Transactional
	@Modifying
	@Query(value = "UPDATE cart SET quantity = :quantity WHERE user_id = :userId AND product_id = :productId", nativeQuery = true)
	public int updateCartItem(@Param("quantity") int qty, @Param("userId") int uid, @Param("productId") int pid);
    
}