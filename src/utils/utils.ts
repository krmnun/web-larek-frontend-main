// Утилита для поиска элемента по селектору
export function ensureElement<T extends HTMLElement>(selector: string, context: HTMLElement = document.body): T {
    const element = context.querySelector<T>(selector);
    if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
    }
    return element;
}

// Утилита для создания элемента
export function createElement<T extends HTMLElement>(tagName: string, attrs: Record<string, string> = {}): T {
    const element = document.createElement(tagName) as T;
    for (const [key, value] of Object.entries(attrs)) {
        if (key === 'textContent') {
            element.textContent = value;
        } else {
            element.setAttribute(key, value);
        }
    }
    return element;
}

// Утилита для клонирования шаблона
export function cloneTemplate<T extends HTMLElement>(selectorOrTemplate: string | HTMLTemplateElement): T {
    const template =
      typeof selectorOrTemplate === 'string'
        ? ensureElement<HTMLTemplateElement>(selectorOrTemplate)
        : selectorOrTemplate;
    const element = template.content.firstElementChild;
    if (!element) {
        throw new Error('Template content is empty');
    }
    return element.cloneNode(true) as T;
}