import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(1, 'Bob', 1, 'Bob', 1, 'Bob')).toBeTruthy();
  });
});