(_window => {
    let _windowId: string | undefined = undefined;
    const setupDefaultBridge = () => {
        const { eventBus } = _window;
        setupOnMessage();
        eventBus.on(
            modalWindowEvents.REGISTER_WINDOW_ID_EVENT_NAME,
            handleRegisterWindowId,
            this
        );
        eventBus.on(
            modalWindowEvents.SEND_MESSAGE_TO_PARENT_WINDOW_EVENT_NAME,
            handleMessageToParentWindow,
            this
        );
    };

    const handleRegisterWindowId = ({ windowId }) => {
        _windowId = windowId;
    };

    const handleMessageToParentWindow = ({ name, data }) => {
        console.log('Modal.Window.Bridge.handleMessageToParentWindow', {
            name,
            data,
        });
        sendMessageToParent({
            name,
            data: { windowId: _windowId, ...data },
        });
    };

    const setupOnMessage = () => {
        _window.addEventListener('message', ({ data }: any) => {
            if (!data) {
                return;
            }
            const { eventBus } = _window;
            eventBus.publish(data);
        });
    };

    const sendMessageToParent = (event: IEvent) => {
        console.log('Modal.Window.Bridge.sendMessageToParent', { event });
        _window.opener.ProcessChildMessage(event, '*');
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
