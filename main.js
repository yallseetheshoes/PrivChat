// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const net = require('net');


const client = new net.Socket();

client.connect(28015, "10.0.0.15", () => {
  console.log('Connected to server');
});

client.on('error', (error) => {
  console.error('Network error:', error.message);
});


function createWindow () {
  // Create the browser window.
  const loaderWindow = new BrowserWindow({
    width: 300,
    height: 200,

    resizable: false,
    frame: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  loaderWindow.removeMenu();

  loaderWindow.loadFile('index.html') // load html



}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
