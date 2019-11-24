const { app, BrowserWindow } = require('electron');
const path = require("path");
const bridgeModal = require("./bridge/bridge.modal");

require('dotenv').config();
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`),
    forceHardReset: true,
});

function createWindow() {
    console.log("Creating Window to " + process.env.APPLICATION_URL)
    bridgeModal.build();
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'js', 'modal.main.js')
        }
    })

    // and load the index.html of the app.
    win.loadURL(process.env.APPLICATION_URL);
}

app.on('ready', createWindow);