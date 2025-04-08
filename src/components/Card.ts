import { IProductList, ICardActions } from '../types'; // Обновляем импорт
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

export class Card extends Component<IProductList> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement | null; // Изменяем тип на HTMLElement | null
	protected _image: HTMLImageElement | null; // Изменяем тип на HTMLImageElement | null
	protected _description: HTMLElement | null; // Изменяем тип на HTMLElement | null
	protected _button: HTMLButtonElement | null; // Изменяем тип на HTMLButtonElement | null

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._category = container.querySelector('.card__category');
		this._image = container.querySelector('.card__image') as HTMLImageElement | null;
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button') as HTMLButtonElement | null;

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set price(value: number) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
	}

	get price(): number {
		return parseInt(this._price.textContent || '0');
	}

	set category(value: string) {
		if (this._category) {
			this.setText(this._category, value);
			this._category.className = 'card__category';
			this._category.classList.add(`card__category_${value}`);
		}
	}

	set image(value: string) {
		if (this._image) {
			this._image.src = value;
			this._image.alt = this.title;
		}
	}

	set description(value: string) {
		if (this._description) {
			this.setText(this._description, value);
		}
	}

	set buttonText(value: string) {
		if (this._button && value) { // Добавляем проверку на value
			this.setText(this._button, value);
		}
	}
}

export class BasketCard extends Component<IProductList> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		this.setText(this._price, `${value} синапсов`);
	}
}