package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.dtos.WishlistItemRequest;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistItem;
import com.revature.services.ProductService;
import com.revature.services.UserService;
import com.revature.services.WishlistItemService;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin
public class WishlistItemController {

    private final WishlistItemService wishlistItemService;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public WishlistItemController(WishlistItemService wishlistItemService, ProductService productService,
            UserService userService) {
        this.wishlistItemService = wishlistItemService;
        this.productService = productService;
        this.userService = userService;
    }


    @Authorized
    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlistItems(@PathVariable("userId") int userId){
        Optional<User> optionalUser = userService.findById(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            List<WishlistItem> items =  wishlistItemService.findByUser(user);
            return ResponseEntity.ok().body(items);
        }
        
        return ResponseEntity.badRequest().build();
    }

    @Authorized
    @PostMapping("/{userId}")
    public ResponseEntity<Product> addWishlistItem(@RequestBody WishlistItemRequest wishlistItemDTO, @PathVariable("userId") int userId){
        Optional<Product> optionalProduct = productService.findById(wishlistItemDTO.getProductId());
        Optional<User> optionalUser = userService.findById(userId);

        if(optionalProduct.isPresent() && optionalUser.isPresent()){
            Product product = optionalProduct.get();
            User user = optionalUser.get();

            wishlistItemService.addProduct(product,user);
            return ResponseEntity.accepted().body(product);
        }
        return ResponseEntity.badRequest().build();
    }
    
    @Authorized
    @DeleteMapping("/{wishlistitemId}")
    public ResponseEntity<Boolean> deleteWishlistitem(@PathVariable("wishlistitemId") int wishlistItemId){

        if(wishlistItemService.deleteWishlistItem(wishlistItemId)){
            return ResponseEntity.accepted().body(true);
        }

        return ResponseEntity.badRequest().build();
    }

}
