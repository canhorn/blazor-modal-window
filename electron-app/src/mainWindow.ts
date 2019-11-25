import { app, BrowserWindow } from 'electron';
import * as logger from 'electron-log';
import * as path from 'path';

let mainWindow: BrowserWindow | undefined = undefined;

export const createMainWindow = () => {
    if (!process.env.APPLICATION_URL) {
        throw {
            message:
                'APPLICATION_URL is invalid: ' + process.env.APPLICATION_URL,
            code: 'invalid_application_url',
        };
    }
    logger.log('Creating Window to ' + process.env.APPLICATION_URL);
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(
                app.getAppPath(),
                '..',
                'client',
                'preload.root.js'
            ),
        },
    });

    win.loadURL(process.env.APPLICATION_URL);

    mainWindow = win;
};

export const getMainWindow = () => {
    if (!mainWindow) {
        throw {
            message: 'Window is not created.',
            code: 'window_not_created',
        };
    }
    return mainWindow;
};
