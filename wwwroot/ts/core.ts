const DEFAULT_BRIDGE_MODE = 'DEFAULT';
((_window: any) => {
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
