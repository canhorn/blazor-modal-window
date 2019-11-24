((_window: Window) => {
    const _listenerMap = new Map();
    const eventBus: IEventBus = {
        on: (eventName, eventListener, context) => {
            _listenerMap.set(eventName, [
                ...(_listenerMap.get(eventName) || []),
                {
                    function: eventListener,
                    context,
                },
            ]);
            return eventBus;
        },
        off: (eventName, eventListener, context) => {
            _listenerMap.set(
                eventName,
                (_listenerMap.get(eventName) || []).filter(
                    listener =>
                        listener.function !== eventListener ||
                        listener.context !== context
                )
            );
            return eventBus;
        },
        /**
         * @param event { name: string; data: any; }
         */
        publish: async event => {
            console.log('EventBus', { event });
            const eventListeners = _listenerMap.get(event.name) || [];
            const len = eventListeners.length;
            // Send to JavaScript listeners
            for (let index = 0; index < len; index++) {
                const listener = eventListeners[index];
                try {
                    listener.function.call(listener.context, event.data);
                } catch (ex) {
                    console.error('Listener failed', ex);
                }
            }

            // '*' All eventListener
            const allListeners = _listenerMap.get('*') || [];
            // Send to JavaScript listeners
            for (let index = 0; index < allListeners.length; index++) {
                const listener = allListeners[index];
                try {
                    listener.function.call(listener.context, event);
                } catch (ex) {
                    console.error('"*" Listener failed', ex);
                }
            }

            return eventBus;
        },
    };
    _window.eventBus = eventBus;
})(window);

type CreateEventType = <T = any>(name: string, data: T) => IEvent;
const createEvent: CreateEventType = <T>(name: string, data: T): IEvent<T> => {
    return {
        name,
        data,
    };
};

interface Window {
    eventBus: IEventBus;
}

interface IEvent<T = {}> {
    name: string;
    data: T;
}

interface IEventBus {
    on: (
        eventName: string,
        eventListener: (data: any) => void,
        context: any
    ) => IEventBus;
    off: (
        eventName: string,
        eventListener: (data: any) => void,
        context: any
    ) => IEventBus;
    publish: (event: IEvent) => Promise<IEventBus>;
}
