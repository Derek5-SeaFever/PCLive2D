/* This file is required by the index.html file and will
be executed in the renderer process for that window.
No Node.js APIs are available in this process because
`nodeIntegration` is turned off. Use `preload.js` to
selectively enable features needed in the rendering
process. */

const { ipcRenderer } = require('electron');
const html = document.querySelector("html");
const curtain = document.querySelector("#curtain");
let canMove = null;
ipcRenderer.on('window-move-open', (event, args) => {
	canMove = args;
	if(canMove) {
		curtain.style.display = 'block';
	} else {
		curtain.style.display = 'none';
	}
});
html.addEventListener('mousedown', () => {
	ipcRenderer.send('window-move-open', canMove);
});
html.addEventListener('mouseup', () => {
	ipcRenderer.send('window-move-open', false);
});