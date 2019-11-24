using System.Collections;
using System.Collections.Generic;

namespace blazor_modal_window.ClientBus.Model
{
    public interface ClientEvent
    {
        string Name { get; }
        dynamic Data { get; }
    }
}