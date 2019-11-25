const DEFAULT_BRIDGE_MODE = 'DEFAULT';
((_window: Window) => {
    _window.core = {
        start: () => {
            _window.eventBus.publish(
                createEvent(APPLICATION_START_EVENT_NAME, {
                    bridgeMode: _window.bridgeMode || DEFAULT_BRIDGE_MODE,
                })
            );
        },
    };
})(window);

interface Window {
    core: ICore;
    bridgeMode: typeof DEFAULT_BRIDGE_MODE | string;
}

interface ICore {
    start: () => void;
}
