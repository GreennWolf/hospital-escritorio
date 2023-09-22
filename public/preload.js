const {
    contextBridge,
    ipcRenderer,
    BrowserWindow
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "renderer", {
        send: (channel, data) => {
            ipcRenderer.send(channel, data);
        },
        receive: (channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args)); 
        }
    }
);

