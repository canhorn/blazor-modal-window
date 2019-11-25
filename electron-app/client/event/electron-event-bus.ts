const ipcRenderer = require('electron').ipcRenderer;
((_window: Window) => {
    const catchAllListener = (event: IEvent) => {
        console.log('electron.genericListener', { event });
        // Send event to the electron host.
        ipcRenderer.send(event.name, event.data);
    };
    const setupEventBusPublish = () => {
        // On any eventBus.publish event, forward to client eventBus
        ipcRenderer.on('eventBus.publish', (_, message) => {
            const { eventBus } = _window;
            eventBus.publish(message);
        });
    };

    const setupElectronEventBus = () => {
        const { eventBus } = _window;
        setupEventBusPublish();
        eventBus.on('*', catchAllListener, _window);
    };

    _window.addEventListener('load', () => {
        setupElectronEventBus();
    });
})(window);
