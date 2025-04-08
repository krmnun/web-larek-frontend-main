import { IProductList, ApiListResponse, IOrder } from '../types/index';
import { Api } from './base/api';

// Класс AppApi расширяет функциональность Api для работы с конкретными запросами
export class AppApi {
	private _baseApi: Api; // Экземпляр класса Api для отправки запросов
	private readonly cdn: string; // URL для CDN (например, для загрузки картинок)

	// Конструктор принимает URL для CDN и экземпляр Api
	constructor(cdn: string, baseApi: Api) {
		this._baseApi = baseApi;
		this.cdn = cdn;
	}

	async getProducts(): Promise<IProductList[]> {
		const response = await this._baseApi.get<ApiListResponse<IProductList>>('/product');

		if (response && Array.isArray(response.items)) {
			return response.items.map((product) => ({
				...product,
				image: this.cdn + product.image,
			}));
		} else {
			throw new Error('Некорректный формат данных от сервера');
		}
	}

	// Метод для отправки заказа
	async orderProducts(order: IOrder): Promise<IOrder> {
		// Отправляем POST-запрос на /order с данными заказа
		return this._baseApi.post<IOrder>('/order', order);
	}
}
