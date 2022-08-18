import { Product } from "./product";
import { User } from "./user";

export class WishListItem {

    constructor(
        public wishlistItemid: number,
        public product: Product,
        public user: User
    ) {}
}
