"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
class EventDispatcher {
    constructor() {
        this.handlers = new Map();
    }
    register(eventName, eventHandler) {
        const eventHandlers = this.handlers.get(eventName) || [];
        const foundHandler = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.find(handler => handler === eventHandler);
        if (foundHandler) {
            throw new Error("Handler already registered");
        }
        this.handlers.set(eventName, [...eventHandlers, eventHandler]);
    }
    dispatch(event) {
        const eventHandlers = this.handlers.get(event.getName()) || [];
        eventHandlers.forEach(handler => handler.handle(event));
    }
    remove(eventName, eventHandler) {
        const eventHandlers = this.handlers.get(eventName) || [];
        const filteredHandlers = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.filter(handler => handler !== eventHandler);
        this.handlers.set(eventName, filteredHandlers);
    }
    has(eventName, eventHandler) {
        const eventHandlers = this.handlers.get(eventName) || [];
        const foundHandler = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.find(handler => handler === eventHandler);
        return !!foundHandler;
    }
    clear() {
        this.handlers.clear();
    }
}
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=event.dispatcher.js.map