import { IEvents, IProduct } from '../types/index';

export class ProductsData {
    private products: IProduct[] = [];
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit('products:updated', this.products);
    }

    getProduct(id: string): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }

    getProducts(): IProduct[] {
        return this.products;
    }
}
