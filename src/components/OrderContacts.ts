import { Form } from './Form';
import { IEvents, IContactDetails } from '../types/index';

export class OrderContacts extends Form<IContactDetails> {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.emailInput = this.container.querySelector('input[name="email"]') as HTMLInputElement;
        if (!this.emailInput) {
            throw new Error('Email input not found');
        }
        this.phoneInput = this.container.querySelector('input[name="phone"]') as HTMLInputElement;
        if (!this.phoneInput) {
            throw new Error('Phone input not found');
        }
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    get email(): string {
        return this.emailInput.value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }

    get phone(): string {
        return this.phoneInput.value;
    }

    render(): HTMLFormElement {
        return this.container;
    }
}