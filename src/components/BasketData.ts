import { IProductList, IBasketData, IEvents, IOrder } from '../types'; // Обновляем импорт

// Класс BasketData управляет корзиной
export class BasketData implements IBasketData {
	protected _products: IProductList[] = []; // Список продуктов в корзине

	constructor(protected events: IEvents) {
		// Сохраняем events для отправки уведомлений
	}

	// Геттер для получения списка продуктов в корзине
	get products(): IProductList[] {
		return this._products;
	}

	// Метод для добавления продукта в корзину
	addToBasket(product: IProductList) {
		this._products.push(product);
		this.events.emit('basket:change');
	}

	// Метод для удаления продукта из корзины
	removeFromBasket(product: IProductList) {
		this._products = this._products.filter((item) => item.id !== product.id);
		this.events.emit('basket:change');
	}

	// Метод для проверки, есть ли продукт в корзине
	isBasketCard(product: IProductList) {
		if (this._products.some((item) => item.id === product.id)) {
			this.removeFromBasket(product);
		} else {
			this.addToBasket(product);
		}
	}

	// Метод для получения общей суммы корзины
	getBasketPrice(): number {
		return this._products.reduce((total, product) => total + product.price, 0);
	}

	// Метод для получения статуса кнопки (в корзине или нет)
	getButtonStatus(product: IProductList): string {
		return this._products.some((item) => item.id === product.id)
			? 'Удалить из корзины'
			: 'В корзину';
	}

	// Метод для отправки корзины в заказ
	sendBasketToOrder(order: IOrder) {
		order.items = this.products.map((product) => product.id); // Массив строк
		order.total = this.getBasketPrice(); // Число
	}

	// Метод для очистки корзины
	clearBasket() {
		this._products = [];
		this.events.emit('basket:change');
	}
}