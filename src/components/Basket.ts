import { TProductBasket, IBasket, IEvents } from '../types'; // Обновляем импорт
import { createElement, ensureElement } from '../utils/utils';
import { Component } from './base/Component';

// Класс Basket управляет корзиной
export class Basket extends Component<IBasket> {
	protected _catalog: HTMLElement; // Элемент для списка товаров в корзине
	protected _price: HTMLElement; // Элемент для отображения общей суммы
	protected _button: HTMLButtonElement; // Кнопка для оформления заказа
	protected _items: TProductBasket[]; // Список товаров в корзине

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._catalog = ensureElement<HTMLElement>(`.basket__list`, this.container);
		this._price = ensureElement<HTMLElement>(`.basket__price`, this.container);
		this._button = ensureElement<HTMLButtonElement>(`.basket__button`, this.container);
		this._items = [];

		// Добавляем обработчик для кнопки оформления заказа
		this._button.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	// Метод для обновления состояния кнопки
	updateButtonState() {
		const totalPrice = parseFloat(this._price.textContent || '0');
		if (totalPrice > 0) {
			this.setDisabled(this._button, false); // Активируем кнопку
		} else {
			this.setDisabled(this._button, true); // Деактивируем кнопку
		}
	}

	// Сеттер для установки общей суммы
	set total(value: number | null) {
		if (value === null) {
			this._price.textContent = 'Бесценно';
		} else {
			this._price.textContent = `${value} синапсов`;
		}
		this.updateButtonState();
	}

	// Геттер для получения общей суммы
	get total(): number | null {
		const priceText = this._price.textContent;
		if (priceText === 'Бесценно') return null;
		return parseFloat(priceText || '0');
	}

	// Сеттер для установки списка товаров
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._catalog.replaceChildren(...items); // Отображаем товары
		} else {
			this._catalog.replaceChildren(
				createElement('p', { textContent: 'Корзина пуста' }) // Показываем сообщение, если корзина пуста
			);
		}
		this.updateButtonState();
	}

	// Геттер для получения списка товаров
	get items(): HTMLElement[] {
		return Array.from(this._catalog.children) as HTMLElement[];
	}
}