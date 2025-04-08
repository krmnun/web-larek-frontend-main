import { IProductList, IEvents } from '../types/index'; // Обновляем импорт

// Класс ProductsData управляет списком продуктов
export class ProductsData {
	protected _products: IProductList[] = []; // Список продуктов
	protected _preview: string | null = null; // ID продукта для предпросмотра

	constructor(protected events: IEvents) {
		// Сохраняем events для отправки уведомлений
	}

	// Геттер для получения списка продуктов
	get products(): IProductList[] {
		return this._products;
	}

	// Метод для установки списка продуктов
	setProducts(products: IProductList[]) {
		this._products = products;
		this.events.emit('card:change'); // Уведомляем об изменении
	}

	// Метод для получения списка продуктов (дублирует геттер, можно убрать)
	getProducts(): IProductList[] {
		return this._products;
	}

	// Метод для добавления продукта
	addProduct(product: IProductList) {
		this._products = [product, ...this._products];
	}

	// Метод для поиска продукта по ID
	getProduct(id: string) {
		return this.products.find((product) => product.id === id) || null;
	}

	// Метод для сохранения продукта для предпросмотра
	savePreview(product: IProductList): void {
		this._preview = product.id;
		this.events.emit('preview:change', product); // Уведомляем об изменении
	}

	// Геттер для получения ID продукта для предпросмотра
	get preview(): string | null {
		return this._preview;
	}
}