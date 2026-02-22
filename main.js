const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const https = require('https');







function createLoaderWindow () {
  // Create the browser window.
  const loaderWindow = new BrowserWindow({
    width: 300,
    height: 350,

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


app.whenReady().then(() => {
  const loaderWindow = createLoaderWindow()

  https.get('https://localhost:28015/health', (res) => {
    if (res.statusCode === 200) {
      loaderWindow.webContents.send('server-connection',"Connection successful");
    }
  }).on('error', (err) => {
    loaderWindow.webContents.send('server-connection',"Connection failed");
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
