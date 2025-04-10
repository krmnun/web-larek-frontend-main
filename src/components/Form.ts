import { IEvents } from '../types/index';

export class Form<T> {
    protected container: HTMLFormElement;
    protected events: IEvents;
    protected errorsElement: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        this.container = container;
        this.events = events;
        this.errorsElement = this.container.querySelector('.form__errors') as HTMLElement;
        if (!this.errorsElement) {
            throw new Error('Errors element not found');
        }
        this.submitButton = this.container.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (!this.submitButton) {
            throw new Error('Submit button not found');
        }

        this.container.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.events.emit(`${this.container.id}:change`, { [field]: value } as Partial<T>);
        });

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit(`${this.container.id}:submit`);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(messages: string[]) {
        this.errorsElement.textContent = messages.join('; ');
    }

    render(): HTMLFormElement {
        return this.container;
    }
}