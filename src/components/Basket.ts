import { Component } from './base/Component';
import { IEvents, TProductBasket } from '../types/index';

export class Basket extends Component<HTMLElement> {
    private items: TProductBasket[] = [];
    private listElement: HTMLUListElement;
    private totalElement: HTMLElement;
    private orderButton: HTMLButtonElement;
    private cardBasketTemplate: HTMLTemplateElement;

    constructor(element: HTMLElement, events: IEvents) {
        super(element, events);
        this.cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
        this.listElement = this.ensure(this.element, '.basket__list');
        this.totalElement = this.ensure(this.element, '.basket__price');
        this.orderButton = this.ensure(this.element, '.basket__button');

        this.setupEventListeners();
    }

    private renderItem(item: TProductBasket): HTMLElement {
        const li = (this.cardBasketTemplate.content.cloneNode(true) as HTMLElement).querySelector('.basket__item') as HTMLElement;
        const indexElement = this.ensure(li, '.basket__item-index');
        const titleElement = this.ensure(li, '.card__title');
        const priceElement = this.ensure(li, '.card__price');
        const deleteButton = this.ensure<HTMLButtonElement>(li, '.basket__item-delete');

        this.setValue(indexElement, item.index.toString());
        this.setValue(titleElement, item.product.title);
        this.setValue(priceElement, `${item.product.price} синапсов`);
        deleteButton.dataset.id = item.product.id;

        return li;
    }

    private update(): void {
        const items = this.items.map(item => this.renderItem(item));
        this.setChildren(this.listElement, items);
        const total = this.items.reduce((sum, item) => sum + (item.product.price || 0), 0);
        this.setValue(this.totalElement, `${total} синапсов`);
        this.setDisabled(this.orderButton, this.items.length === 0);
    }

    setItems(items: TProductBasket[]): void {
        this.items = items;
        this.update();
    }

    private setupEventListeners(): void {
        this.listElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('basket__item-delete')) {
                const id = target.dataset.id;
                if (id) {
                    this.events.emit('product:removeFromBasket', { id });
                }
            }
        });

        this.orderButton.addEventListener('click', () => {
            this.events.emit('basket:order');
        });
    }
}