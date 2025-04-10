import { Component } from './base/Component';
import { IEvents } from '../types/index';

export class Success extends Component<HTMLElement> {
    private totalEL: HTMLElement;
    private closeBtn: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.totalEL = this.ensure(this.element, '.order-success__description');
        this.closeBtn = this.ensure(this.element, '.order-success__close');
        this.closeBtn.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

    set total(value: number) {
        this.setText(this.totalEL, `Списано ${value} синапсов`);
    }
}
