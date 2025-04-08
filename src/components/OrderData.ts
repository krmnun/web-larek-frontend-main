// Временное определение IOrder для отладки
interface IOrder {
	total: number;
	items: string[];
	email: string;
	phone: string;
	address: string;
	payment: string;
}

import { IEvents, IOrderData, TFormErrors } from '../types/index';

export class OrderData implements IOrderData {
	protected _order: IOrder = {
		total: 0,
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
	};

	protected _errors: TFormErrors = {};

	constructor(protected events: IEvents) {}

	setOrderPayment(value: string) {
		this._order.payment = value;
		this.validateOrder();
	}

	setOrderEmail(value: string) {
		this._order.email = value;
		this.validateOrder();
	}

	setOrderField<K extends keyof IOrder>(field: K, value: IOrder[K]): void {
		this._order[field] = value;
		this.validateOrder();
	}

	validateOrder() {
		const errors: TFormErrors = {};

		if (!this._order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this._order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this._order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this._order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this._errors = errors;
		this.events.emit('errors:change', this._errors);
		return Object.keys(errors).length === 0;
	}

	get order(): IOrder {
		return this._order;
	}

	clearOrder() {
		this._order = {
			total: 0,
			items: [],
			payment: '',
			address: '',
			email: '',
			phone: '',
		};
		this._errors = {};
	}
}