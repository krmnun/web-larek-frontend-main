export function ensureElement<T extends HTMLElement>(selector: string, context: HTMLElement | Document = document): T {
    const element = context.querySelector(selector);
    if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
    }
    return element as T;
}
