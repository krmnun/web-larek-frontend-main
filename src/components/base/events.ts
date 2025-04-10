export interface IEvents {
    on<T>(event: string, callback: (data: T) => void): void;
    emit<T>(event: string, data?: T): void;
}

export class EventEmitter implements IEvents {
    private events: Map<string, Set<(data: unknown) => void>>;

    constructor() {
        this.events = new Map();
    }

    on<T>(event: string, callback: (data: T) => void): void {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.add(callback as (data: unknown) => void);
        }
    }

    emit<T>(event: string, data?: T): void {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}