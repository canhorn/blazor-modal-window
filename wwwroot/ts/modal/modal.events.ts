/*
 * GENERATED_FILE: path/to/C#/ModelEvents.cs
 * This file should be generated from C# code.
 */

/**
 * Model - Events
 */
const modelEvents = {
    OPEN_WINDOW_EVENT_NAME: 'Model:OPEN_WINDOW:Event',
    CLOSE_WINDOW_EVENT_NAME: 'Model:CLOSE_WINDOW:Event',
    SEND_MESSAGE_TO_WINDOW_EVENT_NAME: 'Model:SEND_MESSAGE_TO_WINDOW:Event',
    PROCESS_CHILD_MESSAGE_EVENT_NAME: 'Model:PROCESS_CHILD_MESSAGE:Event',
    BEFORE_UNLOAD_EVENT_NAME: 'Model:BEFORE_UNLOAD:Event',
    CLOSED_WINDOW: 'Model:CLOSED_WINDOW:Event',
};

/**
 * Model - Events Data
 */
interface IModalOpenWindowEventData {
    windowId: string;
}
interface IModalCloseWindowEventData {
    windowId: string;
}
interface IModalSendMessageEventData {
    windowId: string;
    message: any;
}
interface IModalProcessChildMessageEventData {
    windowId: string;
    message: any;
}
interface IModalBeforeUnloadEventData {}
interface IModalClosedWindowEventData {}
