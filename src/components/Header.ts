import { Component } from './base/Component';
import { IEvents } from '../types/index';

interface IHeaderSettings {
    basketButton: string;
    basketCounter: string;
}

export class Header extends Component<HTMLElement> {
    protected basketCounter: HTMLElement;

    constructor(element: HTMLElement, settings: IHeaderSettings, events: IEvents) {
        super(element, events);
        this.basketCounter = this.ensure(this.element, settings.basketCounter);

        const basketButton = this.ensure<HTMLButtonElement>(this.element, settings.basketButton);
        basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setValue(this.basketCounter, value.toString());
    }
}