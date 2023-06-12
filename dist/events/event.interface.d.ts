export interface EventInterface<T> {
    name: string;
    payload: T;
    dateTime: Date;
}
