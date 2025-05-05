import { app, BrowserWindow, desktopCapturer, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// import { ipcMain } from 'electron';
// import axios from 'axios'
//  const httpclient = axios.create({
//   baseURL: import.meta.env.VITE_HOST_URL,
//   headers: {
//     'Origin': 'http://localhost:3000'  // Match server origin
//   }
// });

// ipcMain.handle('fetch-user', async (event, clerkId) => {
//   try {
//     const response = await httpclient.get(`/auth/${clerkId}`, {
//       headers: { "Content-Type": "application/json" }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     throw error;
//   }
// });

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let studio: BrowserWindow | null;
let floatinWebCam: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    height: 500,
    width: 400,
    minHeight: 300,
    minWidth: 300,
    maxWidth: 700,
    frame: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: false,
    focusable: false,
    backgroundColor: "#00000000",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "preload.mjs"),
      // webSecurity: false
    },
  });

  studio = new BrowserWindow({
    height: 300,
    width: 400,
    minHeight: 50,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: 400,
    frame: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: false,
    focusable: false,
    backgroundColor: "#00000000",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "preload.mjs"),
      // webSecurity: false
    },
  });

  floatinWebCam = new BrowserWindow({
    height: 200,
    width: 200,
    minHeight: 100,
    minWidth: 150,
    maxWidth: 400,
    maxHeight: 400,
    frame: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: false,
    focusable: false,
    backgroundColor: "#00000000",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "preload.mjs"),
      // webSecurity: false
    },
  });

  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setAlwaysOnTop(true, "screen-saver", 1);
  studio.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  studio.setAlwaysOnTop(true, "screen-saver", 1);
  floatinWebCam.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  floatinWebCam.setAlwaysOnTop(true, "screen-saver", 1);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });
  studio.webContents.on("did-finish-load", () => {
    studio?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });
  // floatinWebCam.webContents.on("did-finish-load", () => {
  //   floatinWebCam?.webContents.send(
  //     "main-process-message",
  //     new Date().toLocaleString()
  //   );
  // });

  if (VITE_DEV_SERVER_URL) {
    // win.webContents.openDevTools();
    win.loadURL(VITE_DEV_SERVER_URL);
    studio.loadURL(`${import.meta.env.VITE_LOCAL_URL}/studio.html`);
    floatinWebCam.loadURL(`${import.meta.env.VITE_LOCAL_URL}/webcam.html`);
  } else {
    win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
    studio.loadFile(path.join(RENDERER_DIST, "studio.html"));
    floatinWebCam.loadFile(path.join(RENDERER_DIST, "webcam.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
    studio = null;
    floatinWebCam = null;
  }
});

ipcMain.on("closeApp", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
    studio = null;
    floatinWebCam = null;
  }
});

ipcMain.handle("getSources", async () => {
  return await desktopCapturer.getSources({
    thumbnailSize: { width: 150, height: 100 },
    fetchWindowIcons: true,
    types: ["window", "screen"],
  });
});

ipcMain.on("media-sources", (event, payload) => {
  console.log(event);
  studio?.webContents.send("profile-recieved", payload);
});

ipcMain.on("resize-studio", (event, payload) => {
  if (payload.shrink) {
    studio?.setSize(400, 100);
  }
  if (!payload.shrink) {
    studio?.setSize(400, 250);
  }
});

ipcMain.on("hide-plugin", (event, payload) => {
  win?.webContents.send("hide-plugin", payload);
});
app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.disableHardwareAcceleration();
app.whenReady().then(createWindow);
