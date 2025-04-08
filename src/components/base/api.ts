import { IApi, ApiPostMethods } from '../../types';

// Класс Api отвечает за отправку запросов к серверу
export class Api implements IApi {
    readonly baseUrl: string; // Базовый URL для запросов (например, "https://api.example.com")
    protected options: RequestInit; // Настройки для запросов (например, заголовки)

    // Конструктор принимает базовый URL и дополнительные настройки
    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json', // Указываем, что отправляем данные в формате JSON
                ...(options.headers as object ?? {}), // Добавляем дополнительные заголовки, если они есть
            },
        };
    }

    // Метод W для обработки ответа от сервера
    protected handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) {
            // Если запрос успешен, возвращаем данные в формате JSON
            return response.json() as Promise<T>;
        } else {
            // Если запрос не удался, возвращаем ошибку
            return Promise.reject(response.statusText);
        }
    }

    // Метод для отправки GET-запроса
    get<T>(uri: string): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET', // Указываем метод GET
        }).then(this.handleResponse<T>); // Обрабатываем ответ
    }

    // Метод для отправки POST-запроса
    post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method, // Указываем метод (POST, PUT или DELETE)
            body: JSON.stringify(data), // Преобразуем данные в JSON
        }).then(this.handleResponse<T>); // Обрабатываем ответ
    }
}
