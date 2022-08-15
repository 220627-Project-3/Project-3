export class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;

    constructor (id: number, name: string, quantity: number, description: string, price: number, image: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}
