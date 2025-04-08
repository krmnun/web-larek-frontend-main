// Интерфейс для класса Api
export interface IApi {
	readonly baseUrl: string; // Базовый URL
	get<T>(uri: string): Promise<T>; // GET-запрос, возвращает данные типа T
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>; // POST-запрос, возвращает данные типа T
}

// Возможные методы для POST-запросов
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Тип для ответа от сервера с массивом данных
export interface ApiListResponse<T> {
	items: T[];
}

// Тип для продукта
export interface IProductList {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
	buttonText?: string;
}

// Тип для продукта в корзине
export type TProductBasket = {
	id: string;
	title: string;
	price: number;
};

// Тип для заказа
export interface IOrder {
	total: number;
	items: string[];
	email: string;
	phone: string;
	address: string;
	payment: string;
}

// Тип для способа оплаты
export type PaymentType = 'online' | 'cash';

// Интерфейс для данных заказа (используется в OrderData)
export interface IOrderData {
	setOrderPayment(value: string): void;
	setOrderEmail(value: string): void;
	setOrderField(field: keyof IOrder, value: string): void;
	validateOrder(): boolean;
	clearOrder(): void;
	get order(): IOrder;
}

// Интерфейс для корзины (для Basket.ts)
export interface IBasket {
	items: HTMLElement[];
	total: number;
}

// Интерфейс для данных корзины (для BasketData.ts)
export interface IBasketData {
	products: IProductList[];
	addToBasket(product: IProductList): void;
	removeFromBasket(product: IProductList): void;
	isBasketCard(product: IProductList): void;
	getBasketPrice(): number;
	getButtonStatus(product: IProductList): string;
	sendBasketToOrder(order: IOrder): void;
	clearBasket(): void;
}

// Интерфейс для валидации формы (для Form.ts)
export interface IFormValidator {
	valid: boolean;
	errors: string[];
}

// Интерфейс для событий (используется в нескольких местах)
export interface IEvents {
	on(event: string, callback: (data?: unknown) => void): void;
	emit(event: string, data?: unknown): void;
}

// Интерфейс для действий карточки (для Card.ts)
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Тип для формы контактов (для OrderContacts.ts)
export type TOrderContact = {
	phone: string;
	email: string;
};

// Тип для ошибок формы (для OrderData.ts)
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

// Тип для ввода в заказе (для OrderData.ts)
export type TOrderInput = Partial<Pick<IOrder, 'address' | 'phone' | 'email'>>;

// Тип для формы оплаты (для OrderPayment.ts)
export type TOrderPayment = {
	payment: string;
	address: string;
};

// Интерфейс для действий успешного заказа (для Success.ts)
export interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}