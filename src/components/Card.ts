import { Component } from './base/Component';
import { IEvents, IProduct } from '../types/index';
import { BasketData } from './BasketData';

export class Card extends Component<HTMLElement> {
    private product: IProduct;
    private basket: BasketData;
    private titleElement: HTMLElement;
    private priceElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private categoryElement: HTMLElement;
    private button: HTMLButtonElement;

    constructor(element: HTMLElement, product: IProduct, events: IEvents, basket: BasketData) {
        super(element, events);
        this.product = product;
        this.basket = basket;
        this.titleElement = this.ensure(this.element, '.card__title');
        this.priceElement = this.ensure(this.element, '.card__price');
        this.imageElement = this.ensure(this.element, '.card__image');
        this.categoryElement = this.ensure(this.element, '.card__category');
        this.button = this.ensure(this.element, '.card__button');

        this.setText(this.titleElement, product.title);
        this.setText(this.priceElement, `${product.price} синапсов`);
        this.imageElement.src = product.image;
        this.setText(this.categoryElement, product.category);

        this.updateButtonText();
        this.setEventListeners();
    }

    private updateButtonText(): void {
        const isInBasket = this.basket.isInBasket(this.product.id);
        this.setText(this.button, isInBasket ? 'Удалить из корзины' : 'В корзину');
    }

    private setEventListeners(): void {
        this.element.addEventListener('click', (event) => {
            if (event.target !== this.button) {
                this.events.emit('card:preview', this.product);
            }
        });

        this.button.addEventListener('click', (event) => {
            event.stopPropagation();
            if (this.basket.isInBasket(this.product.id)) {
                this.basket.removeProduct(this.product.id);
            } else {
                this.basket.addProduct(this.product);
            }
            this.updateButtonText();
        });
    }
}