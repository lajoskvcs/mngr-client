const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
    win = new BrowserWindow({width: 1024, height: 760});

    win.loadURL(url.format({
        pathname: path.join('localhost:3000'),
        protocol: 'http:',
        slashes: true
    }));


    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('refresh', () => {
    win.loadURL(url.format({
        pathname: path.join('localhost:3000'),
        protocol: 'http:',
        slashes: true
    }));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});