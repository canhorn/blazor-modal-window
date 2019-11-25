import * as electron from 'electron';
import * as logger from 'electron-log';
import { modalWindowEvents } from '../generated/modal/modal.window.events';
import { getMainWindow } from '../mainWindow';
const { ipcMain } = electron;

const build = () => {
    // Do some setup if needed
    logger.log('Building Bridge Window Modal');

    ipcMain.on(
        modalWindowEvents.SEND_MESSAGE_TO_PARENT_WINDOW_EVENT_NAME,
        (event, message) => {
            logger.log(
                modalWindowEvents.SEND_MESSAGE_TO_PARENT_WINDOW_EVENT_NAME,
                { event, message }
            );
            getMainWindow().webContents.send('eventBus.publish', message);
        }
    );
};

export default { build };
