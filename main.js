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
  const options = {
    rejectUnauthorized: false
  };
  loaderWindow.webContents.on('did-finish-load', () => {
    https.get('https://localhost:28015/health',options, (res) => { // REMOVE OPTIONS FOR RELEASE!
      if (res.statusCode === 200) {
        setTimeout(() =>{
          loaderWindow.webContents.send('server-connection',"Connection successful");
          console.log("connection success");
        },2000)
      }
    }).on('error', () => {
      loaderWindow.webContents.send('server-connection',"Connection failed");
      console.log("connection error");
    });
  });
})





//macOS stuff
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


