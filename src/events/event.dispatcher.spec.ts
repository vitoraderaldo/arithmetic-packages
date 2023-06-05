import { createMock } from '@golevelup/ts-jest'
import { EventDispatcher } from "./event.dispatcher"
import { EventHandlerInterface } from './event.handler.interface'
import { EventInterface } from './event.interface'

describe('EventDispatcher', () => {

  let dispatcher: EventDispatcher

  beforeEach(() => {
    dispatcher = new EventDispatcher()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })


  it('should be defined', () => {
    expect(dispatcher).toBeDefined()
  })

  it('should register an event handler', () => {
    const eventName = 'test'
    const eventHandler = createMock<EventHandlerInterface>()
    dispatcher.register(eventName, eventHandler)
    expect(dispatcher.has(eventName, eventHandler)).toBeTruthy()
  })

  it('should not register an event handler twice', () => {
    const eventName = 'test'
    const eventHandler = createMock<EventHandlerInterface>()
    dispatcher.register(eventName, eventHandler)
    expect(() => dispatcher.register(eventName, eventHandler)).toThrowError()
  })

  it('should clear all event handlers', () => {
    const eventName = 'test'
    const eventHandler = createMock<EventHandlerInterface>()
    dispatcher.register(eventName, eventHandler)
    dispatcher.clear()

    const hasHandler = dispatcher.has(eventName, eventHandler)
    expect(hasHandler).toBeFalsy()
  })

  it('should dispatch an event', () => {

    const eventName = 'USER_CREATED'

    const eventHandler1 = createMock<EventHandlerInterface>()
    const eventHandler2 = createMock<EventHandlerInterface>()
    const eventHandler3 = createMock<EventHandlerInterface>()

    const event = createMock<EventInterface>()
    event.getName.mockReturnValue(eventName)

    dispatcher.register(eventName, eventHandler1)
    dispatcher.register(eventName, eventHandler2)
    dispatcher.register('unknown-event', eventHandler3)

    dispatcher.dispatch(event)

    expect(eventHandler1.handle).toHaveBeenCalledTimes(1)
    expect(eventHandler1.handle).toHaveBeenCalledWith(event)
    expect(eventHandler2.handle).toHaveBeenCalledTimes(1)
    expect(eventHandler2.handle).toHaveBeenCalledWith(event)
    expect(eventHandler3.handle).not.toHaveBeenCalled()

  })

  it('should remove an event handler', () => {
    const eventName = 'USER_CREATED'

    const eventHandler1 = createMock<EventHandlerInterface>()
    const eventHandler2 = createMock<EventHandlerInterface>()
    const eventHandler3 = createMock<EventHandlerInterface>()

    dispatcher.register(eventName, eventHandler1)
    dispatcher.register(eventName, eventHandler2)
    dispatcher.register(eventName, eventHandler3)

    dispatcher.remove(eventName, eventHandler2)

    expect(dispatcher.has(eventName, eventHandler2)).toBeFalsy()
    expect(dispatcher.has(eventName, eventHandler1)).toBeTruthy()
    expect(dispatcher.has(eventName, eventHandler3)).toBeTruthy()
  })

})