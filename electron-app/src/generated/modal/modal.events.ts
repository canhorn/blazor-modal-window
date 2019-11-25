/*
 * DO NOT EDIT! 
 * GENERATED FILE!
 * Generated From: Modal/ModalEvents.cs
 * Generated To: electron-app/src/generated/modal/modal.events.ts
 */

/**
 * Modal - Events
 */
export const modalEvents = {
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
export interface IModalOpenWindowEventData {
    windowId: string
    context: string
}
export interface IModalCloseWindowEventData {
    windowId: string
}
export interface IModalSendMessageToWindowEventData {
    windowId: string
    message: any
}
export interface IModalProcessChildMessageEventData {
    windowId: string
}
export interface IModalBeforeUnloadEventData {
    windowId: string
}
export interface IModalClosedWindowEventData {
    windowId: string
}
