import * as electron from 'electron';
import { app, BrowserWindow } from 'electron';
import * as logger from 'electron-log';
import * as path from 'path';
import { electronModalEvents } from '../generated/modal/electron.modal.events';
import {
    IModalCloseWindowEventData,
    IModalOpenWindowEventData,
    IModalSendMessageToWindowEventData,
    modalEvents,
} from '../generated/modal/modal.events';
import { getMainWindow } from '../mainWindow';
const { ipcMain } = electron;

let windows: { [key: string]: BrowserWindow } = {};

const build = () => {
    // Do some setup if needed
    logger.log('Building Bridge Modal');

    ipcMain.on(
        modalEvents.OPEN_WINDOW_EVENT_NAME,
        (event: any, { windowId, context }: IModalOpenWindowEventData) => {
            logger.log(modalEvents.OPEN_WINDOW_EVENT_NAME, {
                event,
                windows,
                windowId,
                context,
            });
            if (windows[windowId]) {
                windows[windowId].close();
                delete windows[windowId];
            }
            let win = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: false,
                    preload: path.join(
                        app.getAppPath(),
                        '..',
                        'client',
                        'startup.js'
                    ),
                },
            });
            win.loadURL(
                process.env.APPLICATION_URL +
                    `/Modal/${windowId}?context=${context}`
            );
            win.on('close', () => {
                getMainWindow().webContents.send('eventBus.publish', {
                    name: modalEvents.CLOSED_WINDOW,
                    data: {
                        windowId,
                    },
                });
            });
            windows[windowId] = win;
        }
    );

    ipcMain.on(
        modalEvents.CLOSE_WINDOW_EVENT_NAME,
        (_, { windowId }: IModalCloseWindowEventData) => {
            logger.log(modalEvents.CLOSE_WINDOW_EVENT_NAME, { windowId });
            if (!windows[windowId]) {
                return;
            }
            windows[windowId].close();
            delete windows[windowId];
        }
    );

    ipcMain.on(
        modalEvents.SEND_MESSAGE_TO_WINDOW_EVENT_NAME,
        (_, { windowId, message }: IModalSendMessageToWindowEventData) => {
            logger.log(modalEvents.SEND_MESSAGE_TO_WINDOW_EVENT_NAME, {
                windowId,
                windows,
                message,
            });
            if (!windows[windowId]) {
                return;
            }
            windows[windowId].webContents.send('eventBus.publish', {
                windowId,
                ...message,
            });
        }
    );

    ipcMain.on(electronModalEvents.CLOSE_ALL_WINDOWS_EVENT_NAME, _ => {
        logger.log(electronModalEvents.CLOSE_ALL_WINDOWS_EVENT_NAME, {
            windows,
        });
        for (const windowId in windows) {
            logger.log({ windowId });
            if (windows.hasOwnProperty(windowId)) {
                const openWindow = windows[windowId];
                logger.log({ windowId, openWindow });
                try {
                    openWindow.close();
                } catch (ex) {
                    logger.error('Failed in closing OpenWindow.', {
                        windowId,
                        error: ex,
                    });
                }
            }
        }
        windows = {};
    });
};

export default {
    build,
};
