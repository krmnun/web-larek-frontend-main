import { IEvents, IProduct, IBasketData, TProductBasket, IOrderData } from '../types/index';

export class BasketData {
    private items: TProductBasket[] = [];
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    addProduct(product: IProduct): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (!existingItem) {
            const index = this.items.length + 1;
            this.items.push({ product, index });
            this.events.emit('basket:updated', this.getBasketData());
        }
    }

    removeProduct(id: string): void {
        this.items = this.items.filter(item => item.product.id !== id);
        this.items.forEach((item, idx) => {
            item.index = idx + 1;
        });
        this.events.emit('basket:updated', this.getBasketData());
    }

    isInBasket(id: string): boolean {
        return this.items.some(item => item.product.id === id);
    }

    getBasketData(): IBasketData {
        return {
            items: this.items,
            total: this.items.reduce((sum, item) => sum + (item.product.price || 0), 0),
        };
    }

    getOrderData(): IOrderData {
        return {
            items: this.items.map(item => item.product.id),
            total: this.items.reduce((sum, item) => sum + (item.product.price || 0), 0),
        };
    }

    clearBasket(): void {
        this.items = [];
        this.events.emit('basket:cleared');
    }
}