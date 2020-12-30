const {ipcRenderer} = require("electron");
ipcRenderer.on("Escape", () => {
    document.exitPointerLock =
        document.exitPointerLock || document.mozExitPointerLock;
    document.exitPointerLock();
})