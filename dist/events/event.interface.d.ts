export interface EventInterface {
    getName(): string;
    getPayload<T>(): T;
    getDateTime(): Date;
}
