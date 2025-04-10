import { Component } from './base/Component';
import { IEvents } from '../types/index';

export class Page extends Component<HTMLElement> {
    private counterEL: HTMLElement;
    private catalogEL: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.counterEL = this.ensure(this.element, '.header__basket-counter');
        this.catalogEL = this.ensure(this.element, '.gallery');
        const basketBtn = this.ensure<HTMLButtonElement>(this.element, '.header__basket');
        basketBtn.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setText(this.counterEL, value.toString());
    }

    set catalog(elements: HTMLElement[]) {
        this.setChildren(this.catalogEL, elements);
    }

    set locked(value: boolean) {
        this.element.classList.toggle('locked', value);
    }
}