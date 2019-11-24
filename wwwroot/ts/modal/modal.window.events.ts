/*
 * DO NOT EDIT! 
 * GENERATED FILE!
 * Generated From: Modal/ModalWindowEvents.cs
 * Generated To: wwwroot/ts/modal/modal.window.events.ts
 */

/**
 * ModalWindow - Events
 */
const modalWindowEvents = {
    REGISTER_WINDOW_ID_EVENT_NAME: 'ModalWindow:REGISTER_WINDOW_ID:Event',
    SEND_MESSAGE_TO_PARENT_WINDOW_EVENT_NAME: 'ModalWindow:SEND_MESSAGE_TO_PARENT_WINDOW:Event',
    PROCESS_MESSAGE_EVENT_NAME: 'ModalWindow:PROCESS_MESSAGE:Event',
};

/**
 * ModalWindow - Events Data
 */
interface IModalWindowRegisterWindowIdEventData {
    windowId: string
}
interface IModalWindowSendMessageToParentWindowEventData {
    name: string
    data: any
}
interface IModalWindowProcessMessageEventData {
    windowId: string
    message: any
}
