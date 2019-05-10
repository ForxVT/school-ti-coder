import { app, BrowserWindow, Menu, MenuItem } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 880,
    height: 722,
    minWidth: 880,
    minHeight: 722,
    useContentSize: true,
    //resizable: false,
  });

  const fileMenu = new Menu();

  fileMenu.append(new MenuItem({
    label: "Nouveau",
  }));
  fileMenu.append(new MenuItem({
    type: "separator",
  }));
  fileMenu.append(new MenuItem({
    label: "Ouvrir...",
  }));
  fileMenu.append(new MenuItem({
    type: "separator",
  }));
  fileMenu.append(new MenuItem({
    label: "Sauvegarder",
  }));
  fileMenu.append(new MenuItem({
    label: "Sauvegarder sous...",
  }));
  fileMenu.append(new MenuItem({
    type: "separator",
  }));
  fileMenu.append(new MenuItem({
    label: "Exporter...",
  }));
  fileMenu.append(new MenuItem({
    type: "separator",
  }));
  fileMenu.append(new MenuItem({
    label: "Quitter",
  }));

  const menu = new Menu();

  menu.append(new MenuItem({ 
    label: "Fichier",
    submenu: fileMenu,
  }));

  mainWindow.setMenu(menu);
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
