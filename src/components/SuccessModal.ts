import { Component } from './base/Component';
import { IEvents } from '../types/index';

export class SuccessModal extends Component<HTMLElement> {
    private total: number;

    constructor(element: HTMLElement, total: number, events: IEvents) {
        super(element, events);
        this.total = total;
        const totalEL = this.ensure(this.element, '.order-success__description');
        this.setText(totalEL, `Списано ${this.total} синапсов`);

        const closeBtn = this.ensure<HTMLButtonElement>(this.element, '.order-success__close');
        closeBtn.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }
}