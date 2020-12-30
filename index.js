/*
    Main.js Zeno Client
    By : Zeno Client Team
*/

// *** The Modules ***
const { screen, app, BrowserWindow, globalShortcut } = require("electron");
var { cpus } = require("os");

// *** Options ***
const devTools = false;
const fullscreenOnload = false;

app.commandLine.appendSwitch("disable-frame-rate-limit");
app.commandLine.appendSwitch("disable-gpu-vsync");
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-breakpad");
app.commandLine.appendSwitch("disable-component-update");
app.commandLine.appendSwitch("disable-print-preview");
app.commandLine.appendSwitch("disable-metrics");
app.commandLine.appendSwitch("disable-metrics-repo");
app.commandLine.appendSwitch("use-angle", "d3d9");
app.commandLine.appendSwitch("smooth-scrolling");
app.commandLine.appendSwitch("enable-javascript-harmony");
app.commandLine.appendSwitch("enable-future-v8-vm-features");
app.commandLine.appendSwitch("enable-webgl2-compute-context");
app.commandLine.appendSwitch("disable-hang-monitor");
app.commandLine.appendSwitch("no-referrers");
app.commandLine.appendSwitch("renderer-process-limit", 100);
app.commandLine.appendSwitch("max-active-webgl-contexts", 100);
app.commandLine.appendSwitch("enable-quic");
app.commandLine.appendSwitch("high-dpi-support", 1);
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
app.commandLine.appendSwitch("disable-bundled-ppapi-flash");
app.commandLine.appendSwitch("disable-logging");
app.commandLine.appendSwitch("disable-web-security");
app.commandLine.appendSwitch("webrtc-max-cpu-consumption-percentage=100");
if (cpus()[0].model.includes("AMD")) {
    app.commandLine.appendSwitch("enable-zero-copy");
}
//#endregion

var win = null;

// *** Run the Main Function ***

var init = () => {
    initMainWindow();
};

app.whenReady().then(() => {
    init();

    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) init();
    });
    
});

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
        globalShortcut.unregisterAll();
    }
});



function initMainWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        icon: `${__dirname}/assets/icon/icon.ico`,
        height: height,
        width: width,
        backgroundColor: "#efefef",
        webPreferences: {
            nodeIntergration: false,
            preload: `${__dirname}/preload.js`,
            webSecurity: false,
            allowRunningInsecureContent: true,
        },
    });
    console.log('Window Created');
    if (devTools) win.webContents.openDevTools();
    bindShortcuts()
    win.loadURL("http://krew.io");
}
function bindShortcuts(){
    globalShortcut.register('Esc',()=>{
        win.webContents.send('Escape')
    })
    globalShortcut.register('CommandOrControl+Q',()=>{
        win.close()
    })
    globalShortcut.register("F4", () => {win.webContents.reload()});
    
    globalShortcut.register("F5", () => {
        app.relaunch();
        app.quit();
    });
    globalShortcut.register("F11", () => {
        win.setSimpleFullScreen(!win.isSimpleFullScreen());
    });
    globalShortcut.register("F12", () => {
        newWin.webContents.openDevTools();
    });
}