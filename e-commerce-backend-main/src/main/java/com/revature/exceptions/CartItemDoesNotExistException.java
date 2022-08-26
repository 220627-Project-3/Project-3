package com.revature.exceptions;

public class CartItemDoesNotExistException extends IllegalArgumentException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CartItemDoesNotExistException(String msg) {
        super(msg);
    }
}