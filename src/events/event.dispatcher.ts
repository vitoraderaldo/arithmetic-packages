import { EventDispatcherInterface } from "./event.dispatcher.interface";
import { EventHandlerInterface } from "./event.handler.interface";
import { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface {

  private handlers: Map<string, EventHandlerInterface[]> = new Map<string, EventHandlerInterface[]>()
  
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    const eventHandlers = this.handlers.get(eventName) || []
    const foundHandler = eventHandlers?.find(handler => handler === eventHandler)
    if (foundHandler) {
      throw new Error("Handler already registered")
    }
    this.handlers.set(eventName, [...eventHandlers, eventHandler])
  }

  dispatch(event: EventInterface<any>): void {
    const eventHandlers = this.handlers.get(event.getName()) || []
    eventHandlers.forEach(handler => handler.handle(event))
  }

  remove(eventName: string, eventHandler: EventHandlerInterface): void {
    const eventHandlers = this.handlers.get(eventName) || []
    const filteredHandlers = eventHandlers?.filter(handler => handler !== eventHandler)
    this.handlers.set(eventName, filteredHandlers)
  }

  has(eventName: string, eventHandler: EventHandlerInterface): boolean {
    const eventHandlers = this.handlers.get(eventName) || []
    const foundHandler = eventHandlers?.find(handler => handler === eventHandler)
    return !!foundHandler
  }

  clear(): void {
    this.handlers.clear()
  }

}
