const { app, BrowserWindow } = require('electron');
const electron = require("electron");
const path = require("path");
const {
    ipcMain
} = electron;

let windows = {};

const build = () => {
    // Do some setup if needed
    console.log("Building Bridge Modal");

    ipcMain.on("modal.handleOpenWindow", (event, windowId) => {
        if (windows[windowId]) {
            windows[windowId].close();
        }
        console.log({ event, windowId })
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(app.getAppPath(), 'js', 'modal.window.js'),
            }
        });
        win.loadURL(process.env.APPLICATION_URL + "/Modal/" + windowId);
        windows[windowId] = win;
    });

    ipcMain.on("modal.handleCloseWindow", (_, windowId) => {
        if (!windows[windowId]) {
            return;
        }
        windows[windowId].close();
        delete windows[windowId]
    });

    ipcMain.on("modal.sendMessage", (_, windowId, message) => {
        if (!windows[windowId]) {
            return;
        }
        console.log({ windowId, message })
        windows[windowId].send("modal.window.processMessage", { windowId, ...message });
    });

    ipcMain.on("modal.handleCloseAllWindows", _ => {
        console.log({ windows })
        for (const key in windows) {
            console.log({ key })
            if (windows.hasOwnProperty(key)) {
                const openWindow = windows[key];
                console.log({ key, openWindow })
                openWindow.close();
            }
        }
        windows = {};
    });
};

module.exports = {
    build
};