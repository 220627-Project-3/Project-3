package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistItem;
import com.revature.repositories.WishlistItemRepository;

@Service
public class WishlistItemService {
    private final WishlistItemRepository wishlistitemRepository;

    @Autowired
    public WishlistItemService(WishlistItemRepository wishlistitemRepository) {
        this.wishlistitemRepository = wishlistitemRepository;
    }

    // find all of a user's wishlistitems
    public List<WishlistItem> findByUser(User user){
        return wishlistitemRepository.findByUser(user);
    }

    // add a product to a user's wishlist
    public boolean addProduct(Product product, User user){
        try {
            WishlistItem newItem = new WishlistItem();
            newItem.setProduct(product);
            newItem.setUser(user);
            List<WishlistItem> list = wishlistitemRepository.findByUser(user);

            // if item is already in user's wishlist, just return
            for(WishlistItem item : list){
                if(item.getProduct() == product && item.getUser() == user){
                    //System.out.println("USER ALREADY HAS IT IN D LISTTTTTTTTTTTTTTTTT");
                    return true;
                }
            }

            wishlistitemRepository.save(newItem);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteWishlistItem(int wishlistItemId){
        try {
            wishlistitemRepository.deleteById(wishlistItemId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return false;
    }

}
