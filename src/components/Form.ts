import { IFormValidator, IEvents } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

// Класс Form управляет формами
export class Form<T> extends Component<IFormValidator> {
	protected _submit: HTMLButtonElement; // Кнопка отправки формы
	protected _errors: HTMLElement; // Элемент для отображения ошибок

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		// Обработчик для ввода данных в форму
		this.container.addEventListener('input', ({ target }) => {
			const { name, value } = target as HTMLInputElement;
			this.onInputChange(name as keyof T, value);
		});

		// Обработчик для отправки формы
		this.container.addEventListener('submit', (e) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	// Сеттер для установки состояния валидности формы
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	// Сеттер для установки текста ошибок (теперь errors — массив строк)
	set errors(value: string[]) {
		this.setText(this._errors, value.join('; '));
	}

	// Метод для обработки изменения данных в форме
	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`order.${field.toString()}:change`, {
			field,
			value,
		});
	}

	// Метод для рендеринга формы
	render(state: Partial<T> & IFormValidator) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}