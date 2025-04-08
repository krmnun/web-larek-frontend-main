import { IEvents, IFormValidator, TOrderPayment } from '../types';
import { Form } from './Form';
import { ensureElement } from '../utils/utils';

export class OrderPayment extends Form<TOrderPayment> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentCard = ensureElement<HTMLButtonElement>(
			'.button_alt[name=card]',
			this.container
		);
		this._paymentCash = ensureElement<HTMLButtonElement>(
			'.button_alt[name=cash]',
			this.container
		);

		this._paymentCard.addEventListener('click', () => {
			this.togglePayment(this._paymentCard);
			this.events.emit('order:change', {
				payment: 'online',
				button: this._paymentCard,
			});
		});

		this._paymentCash.addEventListener('click', () => {
			this.togglePayment(this._paymentCash);
			this.events.emit('order:change', {
				payment: 'cash',
				button: this._paymentCash,
			});
		});
	}

	togglePayment(button: HTMLButtonElement) {
		this._paymentCard.classList.toggle('button_alt-active', button === this._paymentCard);
		this._paymentCash.classList.toggle('button_alt-active', button === this._paymentCash);
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}
}
