using System;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace blazor_modal_window
{
    public static class MessageProvider
    {
        [JSInvokable]
        public static Task GetHelloMessage()
        {
            var message = "Hello from C#";
            Console.WriteLine(message);
            return Task.FromResult(message);
        }
    }
}
