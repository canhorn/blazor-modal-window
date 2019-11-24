var ipcRenderer = require('electron').ipcRenderer;
(() => {

    window.modal = {
        handleOpenWindow: (windowId) => {
            ipcRenderer.send("modal.handleOpenWindow", windowId);
        },
        handleCloseWindow: (windowId) => {
            ipcRenderer.send("modal.handleCloseWindow", windowId);
        },
        sendMessage: (windowId, message) => {
            ipcRenderer.send("modal.sendMessage", windowId, { windowId, ...message });
            // openWindows[windowId].postMessage(
            //     message,
            //     "*"
            // );
        },
    };


    window.ProcessChildMessage = (message) => {
        alert(message.windowId);
        console.log(message);
    };
})()
