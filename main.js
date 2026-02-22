// Modules to control application life and create native browser window
// noinspection SpellCheckingInspection

const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const net = require('net');


const client = new net.Socket();




function createLoaderWindow () {
  // Create the browser window.
  const loaderWindow = new BrowserWindow({
    width: 300,
    height: 200,

    resizable: false,
    frame: false,

    icon: path.join(__dirname, 'assets/privchaticon.ico'),

    webPreferences: {
      preload: path.join(__dirname, 'windows/loader/preload.js')
    }
  })
  loaderWindow.removeMenu();
  loaderWindow.loadFile('windows/loader/loader.html');
  return loaderWindow;
}
function createMainWindow () {
  const mainWindow = new BrowserWindow({




    icon: path.join(__dirname, 'assets/privchaticon.ico'),

    webPreferences: {
      preload: path.join(__dirname, 'windows/main/preload.js')
    }
  })

  mainWindow.loadFile('windows/main/main.html');
  mainWindow.removeMenu();
  return mainWindow;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const loaderWindow = createLoaderWindow()


    loaderWindow.webContents.send('server-connected',"Connection sucessful");






})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
