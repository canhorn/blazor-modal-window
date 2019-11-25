require('./event/electron-event-bus');
require('./startup');

((_window: Window) => {
    _window.addEventListener('beforeunload', () => {
        const { eventBus } = _window;
        eventBus.publish(createEvent("Electron:CLOSE_ALL_WINDOWS:Event", {}));
    });
})(window);
