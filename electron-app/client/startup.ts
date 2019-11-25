require('./event/electron-event-bus');

const ELECTRON_BRIDGE_MODE = 'ELECTRON';
((_window: Window) => {
    _window.bridgeMode = ELECTRON_BRIDGE_MODE;
})(window);
