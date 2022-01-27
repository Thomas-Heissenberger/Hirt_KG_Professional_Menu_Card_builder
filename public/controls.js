const { ipcRenderer } = require('electron');
const closeButton = document.querySelector('.button.close');
const minimizeButton = document.querySelector('.button.minimize');
const maximizeButton = document.querySelector('.button.maximize');

let isMaximized = false;

closeButton.addEventListener('click', () => ipcRenderer.invoke('windowControl', 'close'));
minimizeButton.addEventListener('click', () => ipcRenderer.invoke('windowControl', 'minimize'));
maximizeButton.addEventListener('click', () => {
    isMaximized = !isMaximized;
    ipcRenderer.invoke('windowControl', isMaximized ? 'unmaximize' : 'maximize');
});