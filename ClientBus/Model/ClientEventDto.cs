using System.Collections.Generic;
using System.Text.Json;

namespace blazor_modal_window.ClientBus.Model
{
    public struct ClientEventDto : ClientEvent
    {
        public string Name { get; set; }
        public dynamic Data { get; set; }
    }
}