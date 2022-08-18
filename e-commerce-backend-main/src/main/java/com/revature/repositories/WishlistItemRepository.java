package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.User;
import com.revature.models.WishlistItem;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Integer>{
    // repo for CRUD operations on Wishlistitem table

    // find all of a user's wishlistitems
    List<WishlistItem> findByUser(User user);
    
}
