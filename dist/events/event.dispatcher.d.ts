import { EventDispatcherInterface } from "./event.dispatcher.interface";
import { EventHandlerInterface } from "./event.handler.interface";
import { EventInterface } from "./event.interface";
export declare class EventDispatcher implements EventDispatcherInterface {
    private handlers;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    dispatch(event: EventInterface): void;
    remove(eventName: string, eventHandler: EventHandlerInterface): void;
    has(eventName: string, eventHandler: EventHandlerInterface): boolean;
    clear(): void;
}
