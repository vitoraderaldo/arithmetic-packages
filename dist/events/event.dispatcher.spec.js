"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const event_dispatcher_1 = require("./event.dispatcher");
describe('EventDispatcher', () => {
    let dispatcher;
    beforeEach(() => {
        dispatcher = new event_dispatcher_1.EventDispatcher();
    });
    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(dispatcher).toBeDefined();
    });
    it('should register an event handler', () => {
        const eventName = 'test';
        const eventHandler = (0, ts_jest_1.createMock)();
        dispatcher.register(eventName, eventHandler);
        expect(dispatcher.has(eventName, eventHandler)).toBeTruthy();
    });
    it('should not register an event handler twice', () => {
        const eventName = 'test';
        const eventHandler = (0, ts_jest_1.createMock)();
        dispatcher.register(eventName, eventHandler);
        expect(() => dispatcher.register(eventName, eventHandler)).toThrowError();
    });
    it('should clear all event handlers', () => {
        const eventName = 'test';
        const eventHandler = (0, ts_jest_1.createMock)();
        dispatcher.register(eventName, eventHandler);
        dispatcher.clear();
        const hasHandler = dispatcher.has(eventName, eventHandler);
        expect(hasHandler).toBeFalsy();
    });
    it('should dispatch an event', () => {
        const eventName = 'USER_CREATED';
        const eventHandler1 = (0, ts_jest_1.createMock)();
        const eventHandler2 = (0, ts_jest_1.createMock)();
        const eventHandler3 = (0, ts_jest_1.createMock)();
        const event = (0, ts_jest_1.createMock)();
        event.getName.mockReturnValue(eventName);
        dispatcher.register(eventName, eventHandler1);
        dispatcher.register(eventName, eventHandler2);
        dispatcher.register('unknown-event', eventHandler3);
        dispatcher.dispatch(event);
        expect(eventHandler1.handle).toHaveBeenCalledTimes(1);
        expect(eventHandler1.handle).toHaveBeenCalledWith(event);
        expect(eventHandler2.handle).toHaveBeenCalledTimes(1);
        expect(eventHandler2.handle).toHaveBeenCalledWith(event);
        expect(eventHandler3.handle).not.toHaveBeenCalled();
    });
    it('should remove an event handler', () => {
        const eventName = 'USER_CREATED';
        const eventHandler1 = (0, ts_jest_1.createMock)();
        const eventHandler2 = (0, ts_jest_1.createMock)();
        const eventHandler3 = (0, ts_jest_1.createMock)();
        dispatcher.register(eventName, eventHandler1);
        dispatcher.register(eventName, eventHandler2);
        dispatcher.register(eventName, eventHandler3);
        dispatcher.remove(eventName, eventHandler2);
        expect(dispatcher.has(eventName, eventHandler2)).toBeFalsy();
        expect(dispatcher.has(eventName, eventHandler1)).toBeTruthy();
        expect(dispatcher.has(eventName, eventHandler3)).toBeTruthy();
    });
});
//# sourceMappingURL=event.dispatcher.spec.js.map