import { IEvents } from './events';
import { ensureElement } from '../../utils/utils';

export class Modal {
    private container: HTMLElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        this.container = container;
        this.events = events;
    }

    open(): void {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.events.emit('modal:close');
    }

    setContent(content: HTMLElement): void {
        const contentContainer = ensureElement<HTMLElement>('.modal__content', this.container);
        contentContainer.innerHTML = '';
        contentContainer.appendChild(content);
    }
}