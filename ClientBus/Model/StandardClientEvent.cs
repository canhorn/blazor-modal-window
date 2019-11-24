using System.Text.Json;

namespace blazor_modal_window.ClientBus.Model
{
    public struct StandardClientEvent : ClientEvent
    {
        public string Name { get; }
        public dynamic Data { get; }

        public StandardClientEvent(
            string name,
            dynamic data
        )
        {
            Name = name;
            Data = data;
        }
    }
}