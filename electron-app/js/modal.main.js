const ipcRenderer = require('electron').ipcRenderer;
require("./modal");
(() => {
    window.addEventListener(
        "beforeunload",
        () => {
            if (typeof window.modal.windowId !== "undefined") {
                return;
            }
            ipcRenderer.send("modal.handleCloseAllWindows");
        }
    );
})();

