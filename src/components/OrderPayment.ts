import { Form } from './Form';
import { IEvents, TPaymentInfo } from '../types/index';

export class OrderPayment extends Form<TPaymentInfo> {
    private paymentButtons: HTMLButtonElement[];
    private addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.paymentButtons = Array.from(this.container.querySelectorAll('.button_alt')) as HTMLButtonElement[];
        this.addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
        if (!this.addressInput) {
            throw new Error('Address input not found');
        }

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit('order:selectPayment', { method: button.name, button });
            });
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }

    get address(): string {
        return this.addressInput.value;
    }

    get payment(): string {
        const activeButton = this.paymentButtons.find(button => button.classList.contains('button_alt-active'));
        return activeButton ? activeButton.name : '';
    }

    selectPayment(button: HTMLButtonElement): void {
        this.paymentButtons.forEach(btn => btn.classList.remove('button_alt-active'));
        button.classList.add('button_alt-active');
    }

    render(): HTMLFormElement {
        return this.container;
    }
}