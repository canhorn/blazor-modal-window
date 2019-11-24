/*
 * DO NOT EDIT! 
 * GENERATED FILE!
 * Generated From: Modal/ModalEvents.cs
 * Generated To: wwwroot/ts/modal/modal.events.ts
 */

/**
 * Modal - Events
 */
const modalEvents = {
    OPEN_WINDOW_EVENT_NAME: 'Model:OPEN_WINDOW:Event',
    CLOSE_WINDOW_EVENT_NAME: 'Model:CLOSE_WINDOW:Event',
    SEND_MESSAGE_TO_WINDOW_EVENT_NAME: 'Model:SEND_MESSAGE_TO_WINDOW:Event',
    PROCESS_CHILD_MESSAGE_EVENT_NAME: 'Model:PROCESS_CHILD_MESSAGE:Event',
    BEFORE_UNLOAD_EVENT_NAME: 'Model:BEFORE_UNLOAD:Event',
    CLOSED_WINDOW: 'Model:CLOSED_WINDOW:Event',
};

/**
 * Modal - Events Data
 */
interface IModalOpenWindowEventData {
    windowId: string
    context: string
}
interface IModalCloseWindowEventData {
    windowId: string
}
interface IModalSendMessageEventData {
    windowId: string
    message: any
}
interface IModalProcessChildMessageEventData {
    windowId: string
}
interface IModalBeforeUnloadEventData {
    windowId: string
}
interface IModalClosedWindowEventData {
    windowId: string
}
