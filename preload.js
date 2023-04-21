const fs = require("fs");
const spawn = require("child_process");
const youtubesearchapi = require("youtube-search-api");
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld('fs', {
    readFile: (file) => fs.readFileSync(file, "utf-8"),
    writeFile: (file, data) => fs.writeFileSync(file, data, "utf-8"),
    openDir: (path) => fs.opendirSync(path),
    readDir: (path) => fs.readdirSync(path),
    isFolder: (path) => fs.lstatSync(path).isDirectory(path),
})

contextBridge.exposeInMainWorld("ytSearch", {
    search: x => youtubesearchapi.GetListByKeyword(x, false, 1)
})

contextBridge.exposeInMainWorld('child_process', {
    spawn: (args) => spawn.execSync(args, {encoding: "utf8"}).toString()
})