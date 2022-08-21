import { Product } from './product';
import { User } from './user';
import { WishListItem } from './wish-list-item';

describe('WishListItem', () => {
  it('should create an instance', () => {
    expect(new WishListItem(1,new Product(1,"Bob",1,"Bob",1,"Bob"),new User(1,"Bob","Bob","Bob","Bob",false))).toBeTruthy();
  });
});
