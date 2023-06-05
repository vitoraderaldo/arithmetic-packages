export interface EventInterface<T> {
  getName(): string;
  getPayload(): T;
  getDateTime(): Date;
}
