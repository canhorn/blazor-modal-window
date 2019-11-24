const APPLICATION_START_EVENT_NAME = 'core.application.start';
interface IApplicationStartEventData {
    bridgeMode: typeof DEFAULT_BRIDGE_MODE;
}

const APPLICATION_CLIENT_EVENT = 'Application:CLIENT:event';
const APPLICATION_JAVASCRIPT_EVENT = 'Application:JAVASCRIPT:event';
