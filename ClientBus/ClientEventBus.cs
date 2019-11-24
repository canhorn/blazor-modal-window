using System.Threading.Tasks;
using blazor_modal_window.ClientBus.Model;

namespace blazor_modal_window.ClientBus
{
    public interface ClientEventBus
    {
        Task Publish(
            ClientEvent clientEvent
        );
    }
}