import { app, ipcMain, desktopCapturer, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let studio;
let floatinWebCam;
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
      preload: path.join(__dirname, "preload.mjs")
      // webSecurity: false
    }
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
      preload: path.join(__dirname, "preload.mjs")
      // webSecurity: false
    }
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
      preload: path.join(__dirname, "preload.mjs")
      // webSecurity: false
    }
  });
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setAlwaysOnTop(true, "screen-saver", 1);
  studio.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  studio.setAlwaysOnTop(true, "screen-saver", 1);
  floatinWebCam.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  floatinWebCam.setAlwaysOnTop(true, "screen-saver", 1);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  studio.webContents.on("did-finish-load", () => {
    studio == null ? void 0 : studio.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    studio.loadURL(`${"http://localhost:5173"}/studio.html`);
    floatinWebCam.loadURL(`${"http://localhost:5173"}/webcam.html`);
  } else {
    win.loadFile("dist/index.html");
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
    studio.loadFile(path.join(RENDERER_DIST, "studio.html"));
    floatinWebCam.loadFile(path.join(RENDERER_DIST, "webcam.html"));
  }
}
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
    types: ["window", "screen"]
  });
});
ipcMain.on("media-sources", (event, payload) => {
  console.log(event);
  studio == null ? void 0 : studio.webContents.send("profile-recieved", payload);
});
ipcMain.on("resize-studio", (event, payload) => {
  if (payload.shrink) {
    studio == null ? void 0 : studio.setSize(400, 100);
  }
  if (!payload.shrink) {
    studio == null ? void 0 : studio.setSize(400, 250);
  }
});
ipcMain.on("hide-plugin", (event, payload) => {
  win == null ? void 0 : win.webContents.send("hide-plugin", payload);
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.disableHardwareAcceleration();
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
