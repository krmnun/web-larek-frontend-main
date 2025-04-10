import { Component } from './base/Component';
import { IEvents } from '../types/index';

export class CardsContainer extends Component<HTMLElement> {
    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
    }

    set catalog(items: HTMLElement[]) {
        this.setChildren(this.element, items);
    }
}