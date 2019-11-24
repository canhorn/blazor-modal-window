using System.Threading.Tasks;
using blazor_modal_window.ClientBus.Model;
using Microsoft.JSInterop;

namespace blazor_modal_window.ClientBus
{
    public class JavaScriptClientEventBus : ClientEventBus
    {
        private readonly IJSRuntime _runtime;
        public JavaScriptClientEventBus(
            IJSRuntime runtime
        )
        {
            _runtime = runtime;
        }

        public async Task Publish(
            ClientEvent clientEvent
        )
        {
            await _runtime.InvokeVoidAsync(
                "eventBus.publish",
                clientEvent
            );
        }
    }
}