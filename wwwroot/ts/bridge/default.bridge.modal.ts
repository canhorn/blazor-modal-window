((_window: Window) => {
    const openWindows: { [key: string]: Window } = {};
    const setupDefaultBridge = () => {
        const { eventBus } = _window;
        setupOnBeforeUnload();
        setupProcessChildMessage();
        eventBus.on(
            modelEvents.OPEN_WINDOW_EVENT_NAME,
            handleOpenWindow,
            this
        );
        eventBus.on(
            modelEvents.CLOSE_WINDOW_EVENT_NAME,
            handleCloseWindow,
            this
        );
        eventBus.on(modelEvents.SEND_MESSAGE_TO_WINDOW_EVENT_NAME, sendMessageToWindow, this);
    };

    const handleOpenWindow = ({ windowId, context }) => {
        const newWindow = window.open(
            `/Modal/${windowId}?context=${context}`,
            '_blank',
            'menubar=no,status=no,titlebar=no'
        );
        openWindows[windowId] = newWindow;
        newWindow.addEventListener('load', () => {
            newWindow.addEventListener('unload', () => {
                const { eventBus } = _window;
                console.log('unload', { windowId, openWindows });
                delete openWindows[windowId];
                eventBus.publish(
                    createEvent(modelEvents.CLOSED_WINDOW, {
                        windowId,
                    })
                );
            });
        });
    };

    const handleCloseWindow = ({ windowId }) => {
        console.log('HandleCloseWindow', { windowId, openWindows });
        if (!openWindows[windowId]) {
            return;
        }
        openWindows[windowId].close();
    };

    const sendMessageToWindow = ({ windowId, message }: IModalSendMessageEventData) => {
        if (!openWindows[windowId]) {
            return;
        }
        console.log('SendMessage', { windowId, ...message });
        openWindows[windowId].postMessage({ windowId, ...message }, '*');
    };

    const setupProcessChildMessage = () => {
        const { eventBus } = _window;
        _window.ProcessChildMessage = (event: IEvent) => {
            console.log('Modal.Bridge.setupProcessChildMessage', event);
            eventBus.publish(event);
        };
    };

    const setupOnBeforeUnload = () => {
        _window.addEventListener('beforeunload', () => {
            console.log('setupOnBeforeUnload.beforeunload');
            const { eventBus } = _window;
            eventBus.publish(
                createEvent(modelEvents.BEFORE_UNLOAD_EVENT_NAME, {})
            );
            for (const key in openWindows) {
                if (openWindows.hasOwnProperty(key)) {
                    const openWindow = openWindows[key];
                    openWindow.close();
                }
            }
        });
    };
    _window.eventBus.on(
        APPLICATION_START_EVENT_NAME,
        ({ bridgeMode }: IApplicationStartEventData) => {
            if (bridgeMode === DEFAULT_BRIDGE_MODE) {
                setupDefaultBridge();
            }
        },
        _window
    );
})(window);

interface Window {
    ProcessChildMessage: (message: any) => void;
}
