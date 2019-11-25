import { app } from 'electron';
import * as logger from 'electron-log';
import bridgeModal from './bridge/bridge.modal';
import bridgeModalWindow from './bridge/bridge.modal.window';
import { createMainWindow } from './mainWindow';

require('dotenv').config();
logger.transports.file.file = app.getAppPath() + '/app.log';

function applicationReady() {
    createMainWindow();
    bridgeModal.build();
    bridgeModalWindow.build();
}

app.on('ready', applicationReady);
