const { app, BrowserWindow } = require('electron');
const electron = require("electron");
const path = require("path");
const {
    ipcMain
} = electron;

const windows = {};

const build = () => {
    // Do some setup if needed
    console.log("Building Bridge Modal");

    ipcMain.on("modal.window.handleOpenWindow", (event, windowId) => {
        if (windows[windowId]) {
            windows[windowId].close();
        }
        console.log({ event, windowId })
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                preload: [
                    path.join(app.getAppPath(), 'js', 'modal.js'),
                    path.join(app.getAppPath(), 'js', 'modal.window.js'),
                ]
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
        windows[windowId].send("message", { windowId, data: message });
    });
};

module.exports = {
    build
};