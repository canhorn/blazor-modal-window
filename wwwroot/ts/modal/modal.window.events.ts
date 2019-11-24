/*
 * GENERATED_FILE: path/to/C#/ModelWindowEvents.cs
 * This file should be generated from C# code.
 */

/**
 * Model Window - Events
 */
const modelWindowEvents = {
    REGISTER_WINDOW_ID_EVENT_NAME: 'ModalWindow:REGISTER_WINDOW_ID:Event',
    SEND_MESSAGE_TO_PARENT_WINDOW_EVENT_NAME:
        'ModalWindow:SEND_MESSAGE_TO_PARENT_WINDOW:Event',
    PROCESS_MESSAGE_EVENT_NAME: 'ModalWindow:PROCESS_MESSAGE:Event',
};

/**
 * Model Window - Events Data
 */
interface IModalWindowRegisterWindowIdEventData {
    windowId: string;
}
interface IModalWindowSendMessageToParentEventData {
    name: string;
    data: any;
}
interface IModalWindowProcessMessageEventData {
    windowId: string;
    message: any;
}
