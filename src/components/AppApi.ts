import { Api } from './base/api';
import { IProduct, IOrder } from '../types/index';

export class AppApi {
    private cdn: string;
    private api: Api;

    constructor(cdn: string, api: Api) {
        this.cdn = cdn;
        this.api = api;
    }

    async getProducts(): Promise<IProduct[]> {
        try {
            const products = await this.api.get<IProduct[]>('/products'); 
            return products.map(product => ({
                ...product,
                image: this.cdn + product.image,
            }));
        } catch (error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }

    async submitOrder(order: IOrder): Promise<void> {
        try {
            await this.api.post('/order', order);
        } catch (error) {
            throw new Error(`Failed to submit order: ${error.message}`);
        }
    }
}