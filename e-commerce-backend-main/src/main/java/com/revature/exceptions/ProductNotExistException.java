package com.revature.exceptions;


public class ProductNotExistException extends IllegalArgumentException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProductNotExistException(String msg) {
        super(msg);
    }
}