import { Component } from './base/Component';
import { IEvents, IProduct } from '../types/index';

export class ProductModal extends Component<HTMLElement> {
    private product: IProduct;
    private titleElement: HTMLElement;
    private priceElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private categoryElement: HTMLElement;
    private descriptionElement: HTMLElement;
    private button: HTMLButtonElement;

    constructor(element: HTMLElement, product: IProduct, events: IEvents) {
        super(element, events);
        this.product = product;
        this.titleElement = this.ensure(this.element, '.modal__title');
        this.priceElement = this.ensure(this.element, '.modal__price');
        this.imageElement = this.ensure(this.element, '.modal__image');
        this.categoryElement = this.ensure(this.element, '.modal__category');
        this.descriptionElement = this.ensure(this.element, '.modal__description');
        this.button = this.ensure(this.element, '.modal__button');

        this.setText(this.titleElement, product.title);
        this.setText(this.priceElement, `${product.price} синапсов`);
        this.imageElement.src = product.image;
        this.setText(this.categoryElement, product.category);
        this.setText(this.descriptionElement, product.description || 'Описание отсутствует');

        this.button.addEventListener('click', () => {
            this.events.emit('product:addToBasket', this.product);
        });
    }
}