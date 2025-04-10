import { IEvents } from '../../types/index';

export class Component<T extends HTMLElement> {
    protected element: T;
    protected events: IEvents;

    constructor(element: T, events: IEvents) {
        this.element = element;
        this.events = events;
    }

    getElement(): T {
        return this.element;
    }

    protected ensure<K extends HTMLElement>(element: HTMLElement, selector: string): K {
        const result = element.querySelector(selector);
        if (!result) {
            throw new Error(`Element with selector ${selector} not found`);
        }
        return result as K;
    }

    protected setText(element: HTMLElement, value: string): void {
        element.textContent = value;
    }

    protected setValue(element: HTMLElement, value: string): void {
        element.textContent = value;
    }

    protected setDisabled(element: HTMLButtonElement, disabled: boolean): void {
        element.disabled = disabled;
    }

    protected setChildren(parent: HTMLElement, children: HTMLElement[]): void {
        parent.innerHTML = '';
        children.forEach(child => parent.appendChild(child));
    }
}