const ipcRenderer = require('electron').ipcRenderer;
require("./modal");
console.log("hi");
(() => {
    window.modal = window.modal || {};
    window.modal.window = {
        handleRegisterWindowId: (windowId) => {
            window.modal.windowId = windowId;
            // ipcRenderer.send(
            //     "modal.window.handleRegisterWindowId",
            //     windowId
            // );
            // window.modal.windowId = windowId;
        },
        handlePingParentWindow: (windowId) => {
            ipcRenderer.send(
                "modal.window.handlePingParentWindow",
                windowId,
                {
                    windowId,
                    type: "PING"
                }
            );
        }
    };

    ipcRenderer.on("modal.window.processMessage", (event, message) => {
        console.log("Message", { message });
        processMessage(message);
    });

    const processMessage = (message) => {
        alert(message.windowId + " | " + message.type);
    };
})();

