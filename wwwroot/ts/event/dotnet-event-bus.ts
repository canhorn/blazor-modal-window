((_window: Window) => {
    function genericListener(event: IEvent | any) {
        console.log('genericListener', { _this: this, event });
        if (this.eventName !== '*') {
            event = {
                name: this.eventName,
                data: event,
            };
        }
        console.log('genericListener.afterTransform', { _this: this, event });
        this.instance.invokeMethodAsync(this.method, event);
    }
    const dotNetEventBus: IDotNetEventBus = {
        on: (listener: IDotNetListener) => {
            const { eventBus } = _window;
            eventBus.on(listener.eventName, genericListener, listener);
            return dotNetEventBus;
        },
        off: (listener: IDotNetListener) => {
            const { eventBus } = _window;
            eventBus.off(listener.eventName, genericListener, listener);
            return dotNetEventBus;
        },
    };
    _window.dotNetEventBus = dotNetEventBus;
})(window);

interface Window {
    dotNetEventBus: IDotNetEventBus;
}

interface IDotNetListener {
    instance: any;
    method: string;
    eventName: string;
}

interface IDotNetEventBus {
    on: (listener: IDotNetListener) => IDotNetEventBus;
    off: (listener: IDotNetListener) => IDotNetEventBus;
}
