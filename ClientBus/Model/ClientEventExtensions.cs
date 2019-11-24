using System;
using System.Text.Json;

namespace blazor_modal_window.ClientBus.Model
{
    public static class ClientEventExtensions
    {
        private static JsonSerializerOptions JSON_OPTIONS = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };

        public static T CastData<T>(
            this ClientEvent clientEvent
        )
        {
            if (clientEvent.Data.GetType() == typeof(JsonElement))
            {
                Console.WriteLine(
                    clientEvent.Data.GetRawText()
                );
                return JsonSerializer.Deserialize(
                    clientEvent.Data.GetRawText(),
                    typeof(T),
                    JSON_OPTIONS
                );
            }
            return (T)clientEvent.Data;
        }
    }
}