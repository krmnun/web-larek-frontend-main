import { IEvents, IOrder, IProduct, IContactDetails } from '../types/index';

export class OrderData {
    private items: IProduct[] = [];
    private order: Partial<IOrder> = { total: 0, items: [], payment: '', address: '', email: '', phone: '' };
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    addProduct(product: IProduct): void {
        this.items.push(product);
        this.order.items = this.items.map(item => item.id);
        this.order.total = this.items.reduce((sum, item) => sum + (item.price || 0), 0);
        this.events.emit('order:updated', this.order);
    }

    removeProduct(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.order.items = this.items.map(item => item.id);
        this.order.total = this.items.reduce((sum, item) => sum + (item.price || 0), 0);
        this.events.emit('order:updated', this.order);
    }

    updateOrderField(field: keyof IContactDetails | 'payment' | 'address', value: string): void {
        this.order[field] = value;
        this.events.emit('order:fieldUpdated', { field, value });
    }

    getOrder(): IOrder {
        return this.order as IOrder;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    clearOrder(): void {
        this.items = [];
        this.order = { total: 0, items: [], payment: '', address: '', email: '', phone: '' };
        this.events.emit('order:cleared');
    }

    validateForm(
        data: Partial<IContactDetails & { payment: string; address: string }>,
        constraints: Record<string, { presence: { message: string; allowEmpty: boolean } }>
    ): Record<string, string[]> | null {
        const errors: Record<string, string[]> = {};
        for (const [field, constraint] of Object.entries(constraints)) {
            const value = data[field as keyof typeof data];
            if (!value && !constraint.presence.allowEmpty) {
                errors[field] = [constraint.presence.message];
            }
        }
        return Object.keys(errors).length ? errors : null;
    }
}