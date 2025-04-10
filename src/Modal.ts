export class Modal {
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    setContent(element: HTMLElement): void {
        this.element.innerHTML = '';
        this.element.appendChild(element);
    }

    open(): void {
        this.element.classList.add('modal--active');
    }

    close(): void {
        this.element.classList.remove('modal--active');
    }
}