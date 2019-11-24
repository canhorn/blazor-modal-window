namespace blazor_modal_window.Modal
{
    // [GenerateOnClient]
    public class ModalEvents
    {
        public static string OPEN_WINDOW_EVENT_NAME = "Model:OPEN_WINDOW:Event";
        public static string CLOSE_WINDOW_EVENT_NAME = "Model:CLOSE_WINDOW:Event";
        public static string SEND_MESSAGE_TO_WINDOW_EVENT_NAME = "Model:SEND_MESSAGE_TO_WINDOW:Event";
        public static string PROCESS_CHILD_MESSAGE_EVENT_NAME = "Model:PROCESS_CHILD_MESSAGE:Event";
        public static string BEFORE_UNLOAD_EVENT_NAME = "Model:BEFORE_UNLOAD:Event";
        public static string CLOSED_WINDOW = "Model:CLOSED_WINDOW:Event";
    }

    public struct ModalOpenWindowEventData
    {
        public string WindowId { get; set; }
        public string Context { get; set; }
    }
    public struct ModalCloseWindowEventData
    {
        public string WindowId { get; set; }
    }
    public struct ModalSendMessageEventData
    {
        public string WindowId { get; set; }
        public object Message { get; set; }
    }
    public struct ModalProcessChildMessageEventData
    {
        public string WindowId { get; set; }
    }
    public struct ModalBeforeUnloadEventData
    {
        public string WindowId { get; set; }
    }
    public class ModalClosedWindowEventData
    {
        public string WindowId { get; set; }
    }
}