import { EventEmitter } from './components/base/events';
import { Modal } from './components/base/Model';
import { ProductsData } from './components/ProductsData';
import { OrderData } from './components/OrderData';
import { OrderPayment } from './components/OrderPayment';
import { OrderContacts } from './components/OrderContacts';
import { Header } from './components/Header';
import { CardsContainer } from './components/CardsContainer';
import { Card } from './components/Card';
import { ProductModal } from './components/ProductModal';
import { Basket } from './components/Basket';
import { BasketData } from './components/BasketData';
import { Success } from './components/Success';
import { Page } from './components/Page';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { IProduct, IBasketData, IContactDetails, TPaymentInfo } from './types/index';
import './scss/styles.scss';

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация событий
    const events = new EventEmitter();

    // Инициализация API
    const api = new Api(API_URL);
    const appApi = new AppApi(CDN_URL, api);

    // Глобальные компоненты
    const productCatalog = new ProductsData(events);
    const basketData = new BasketData(events);
    const orderData = new OrderData(events);

    // Инициализация UI-компонентов
    const modal = new Modal(document.querySelector('#modal-container') as HTMLElement, events);

    const header = new Header(
        document.querySelector('.header') as HTMLElement,
        {
            basketButton: '.header__basket',
            basketCounter: '.header__basket-counter',
        },
        events
    );

    const page = new Page(document.querySelector('.page') as HTMLElement, events);

    const cardsContainer = new CardsContainer(document.querySelector('.gallery') as HTMLElement, events);

    const basket = new Basket(
        (document.querySelector('#basket') as HTMLTemplateElement).content.querySelector('.basket') as HTMLElement,
        events
    );

    const orderForm = new OrderPayment(
        (document.querySelector('#order') as HTMLTemplateElement).content.querySelector('.form') as HTMLFormElement,
        events
    );

    const contactsForm = new OrderContacts(
        (document.querySelector('#contacts') as HTMLTemplateElement).content.querySelector('.form') as HTMLFormElement,
        events
    );

    const success = new Success(
        (document.querySelector('#success') as HTMLTemplateElement).content.querySelector('.order-success') as HTMLElement,
        events
    );

    // Временные мок-данные
    const mockProducts: IProduct[] = [
        {
            id: '1',
            title: 'Product 1',
            price: 100,
            image: 'https://via.placeholder.com/150',
            category: 'Category 1',
            description: 'Description 1',
        },
        {
            id: '2',
            title: 'Product 2',
            price: 200,
            image: 'https://via.placeholder.com/150',
            category: 'Category 2',
            description: 'Description 2',
        },
    ];

    // Попытка загрузки данных через API, с fallback на мок-данные
    appApi.getProducts().then(products => {
        productCatalog.setProducts(products);
    }).catch(error => {
        console.error('Failed to load products:', error);
        // Если API не работает, используем мок-данные
        productCatalog.setProducts(mockProducts);
    });

    // Функция для рендеринга карточек
    const renderCards = (products: IProduct[]) => {
        const cards = products.map(product => {
            const cardElement = (document.querySelector('#card-catalog') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
            return new Card(cardElement, product, events, basketData).getElement();
        });
        cardsContainer.catalog = cards;
    };

    // Обработчик клика на логотип
    const logo = document.querySelector('.header__logo') as HTMLElement; // Изменяем селектор
    if (logo) {
        logo.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем переход по ссылке
            const products = productCatalog.getProducts();
            renderCards(products);
        });
    } else {
        console.error('Logo element not found. Please check the HTML structure.');
    }

    // Обработка событий
    events.on('card:preview', (product: IProduct) => {
        const previewElement = (document.querySelector('#card-preview') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
        const productModal = new ProductModal(previewElement, product, events);
        modal.setContent(productModal.getElement());
        modal.open();
    });

    events.on('product:addToBasket', (product: IProduct) => {
        basketData.addProduct(product);
        modal.close();
    });

    events.on('product:removeFromBasket', (data: { id: string }) => {
        basketData.removeProduct(data.id);
    });

    events.on('basket:updated', (data: IBasketData) => {
        basket.setItems(data.items);
        header.counter = data.items.length;
        page.counter = data.items.length;
    });

    events.on('basket:open', () => {
        modal.setContent(basket.getElement());
        modal.open();
    });

    events.on('basket:order', () => {
        modal.setContent(orderForm.render());
        modal.open();
        events.emit('order:validate');
    });

    events.on('order:selectPayment', (data: { method: string; button: HTMLButtonElement }) => {
        orderForm.selectPayment(data.button);
        orderData.updateOrderField('payment', data.method);
        events.emit('order:validate');
    });

    events.on('order:change', (data: Partial<TPaymentInfo>) => {
        if (data.address) {
            orderData.updateOrderField('address', data.address);
        }
        if (data.payment) {
            orderData.updateOrderField('payment', data.payment);
        }
        events.emit('order:validate');
    });

    events.on('order:validate', () => {
        const errors = orderData.validateForm(
            { address: orderForm.address, payment: orderForm.payment },
            {
                address: { presence: { message: 'Укажите адрес', allowEmpty: false } },
                payment: { presence: { message: 'Выберите способ оплаты', allowEmpty: false } },
            }
        );
        orderForm.valid = !errors;
        orderForm.errors = errors ? Object.values(errors).flat() : [];
    });

    events.on('order:submit', () => {
        modal.setContent(contactsForm.render());
        modal.open();
        events.emit('contacts:validate');
    });

    events.on('contacts:change', (data: Partial<IContactDetails>) => {
        if (data.email) {
            orderData.updateOrderField('email', data.email);
        }
        if (data.phone) {
            orderData.updateOrderField('phone', data.phone);
        }
        events.emit('contacts:validate');
    });

    events.on('contacts:validate', () => {
        const errors = orderData.validateForm(
            { email: contactsForm.email, phone: contactsForm.phone },
            {
                email: { presence: { message: 'Укажите email', allowEmpty: false } },
                phone: { presence: { message: 'Укажите телефон', allowEmpty: false } },
            }
        );
        contactsForm.valid = !errors;
        contactsForm.errors = errors ? Object.values(errors).flat() : [];
    });

    events.on('contacts:submit', () => {
        const order = orderData.getOrder();
        appApi.submitOrder(order).then(() => {
            success.total = order.total;
            modal.setContent(success.getElement());
            modal.open();
            basketData.clearBasket();
            orderData.clearOrder();
        }).catch(error => {
            console.error('Failed to submit order:', error);
        });
    });

    events.on('success:close', () => {
        modal.close();
    });

    events.on('modal:open', () => {
        page.locked = true;
    });

    events.on('modal:close', () => {
        page.locked = false;
    });
});