export interface IProduct {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export interface IOrder {
    total: number;
    items: string[];
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    total: number;
    items: string[];
}

export interface IBasketData {
    items: TProductBasket[];
    total: number;
}

export interface TProductBasket {
    product: IProduct;
    index: number;
}

export interface IContactDetails {
    email: string;
    phone: string;
}

export interface TPaymentInfo {
    payment: string;
    address: string;
}

export interface IEvents {
    on<T>(event: string, callback: (data: T) => void): void;
    emit<T>(event: string, data?: T): void;
}