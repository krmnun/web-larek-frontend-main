import type { IOrder, IProductList } from '../types/index';
import { IApi } from '../types';
import type { ApiListResponse } from './base/api';

export class AppApi {
	private _baseApi: IApi;
	private cdn: string;

	constructor(cdn: string, baseApi: IApi) {
		this._baseApi = baseApi;
		this.cdn = cdn;
	}

	async getProducts(): Promise<IProductList[]> {
		const response = await this._baseApi.get<ApiListResponse<IProductList>>(
			`/product`
		);
		return response.items.map((product) => ({
			...product,
			image: this.cdn + product.image,
		}));
	}

	async orderProducts(order: IOrder): Promise<IOrder> {
		return await this._baseApi.post<IOrder>('/order', order);
	}
}