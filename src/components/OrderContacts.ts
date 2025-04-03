import { TOrderContact } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export class OrderContacts extends Form<TOrderContact> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = container.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		this._phone = container.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;

		this._email.addEventListener('input', () => {
			this.events.emit('order.email:change', {
				field: 'email',
				value: this._email.value,
			});
		});

		this._phone.addEventListener('input', () => {
			this.events.emit('order.phone:change', {
				field: 'phone',
				value: this._phone.value,
			});
		});
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}
