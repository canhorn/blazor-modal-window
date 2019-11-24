namespace blazor_modal_window.Modal
{
    // [GenerateOnClient]
    public class ModalWindowEvents
    {
        public static string REGISTER_WINDOW_ID_EVENT_NAME = "ModalWindow:REGISTER_WINDOW_ID:Event";
        public static string SEND_MESSAGE_TO_PARENT_WINDOW_EVENT_NAME = "ModalWindow:SEND_MESSAGE_TO_PARENT_WINDOW:Event";
        public static string PROCESS_MESSAGE_EVENT_NAME = "ModalWindow:PROCESS_MESSAGE:Event";
    }

    public struct ModalWindowRegisterWindowIdEventData
    {
        public string WindowId { get; set; }
    }
    public struct ModalWindowSendMessageToParentWindowEventData
    {
        public string Name { get; set; }
        public object Data { get; set; }
    }
    public struct ModalWindowProcessMessageEventData
    {
    }
}