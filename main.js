const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const https = require('https');
const axios = require('axios');







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

  loaderWindow.webContents.on('did-finish-load', () => {
    checkUntilUp(loaderWindow);
  });

  ipcMain.on('login', async (event, credentials) => {
    console.log('Login attempt:', credentials);
    try {
      const res = await axios.post('https://localhost:28015/login', credentials, {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
      });
      event.reply('login-response', res.data);
    } catch (err) {
      event.reply('login-response', { success: false, error: err.message });
    }
  });
})

function checkUntilUp(loaderWindow, delay = 2000) {
  checkServerStatus().then(status => {
    if (status) {
      loaderWindow.webContents.send('server-connection', "Connection successful");
    } else {
      console.log('Server connection failed, retrying');
      setTimeout(() => checkUntilUp(loaderWindow, delay), delay);
    }
  });
}

function checkServerStatus() {
  return new Promise((resolve) => {
    const options = {
      rejectUnauthorized: false // REMOVE FOR RELEASE
    };
    https.get('https://localhost:28015/health', options, (res) => {
      if (res.statusCode === 200) {
        setTimeout(() => {

          console.log("connection success");
          resolve(true);
        }, 2000);
      } else {
        resolve(false);
      }
    }).on('error', () => {
      console.log("connection error");
      resolve(false);
    });
  });
}



//macOS stuff
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


