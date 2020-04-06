// Modules to control application life and create native browser window
const {app, BrowserWindow, screen, Tray, Menu, ipcMain } = require('electron')
const path = require('path')
const http = require('http')

let mainWindow = null;
function createWindow () {
	let scAr = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  mainWindow = new BrowserWindow({
	  x: 0,
	  y: 0,
    width: 360,
    height: 800,
	minWidth: 100,
	minHeight: 200,
	frame: false,
	transparent: true,
	resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
	  nodeIntegration: true // 非常重要的属性
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  // 隐藏任务栏
  mainWindow.setSkipTaskbar(true);
  // 窗口置顶
  mainWindow.setAlwaysOnTop(true);
  // 将参数传递给windowMove函数
  windowMove(mainWindow);
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

let appIcon = null;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();
	appIcon = new Tray('./imgs/icon/pcl2d.ico');
	const contextMenu = Menu.buildFromTemplate([
		{ label: '置顶', type: 'checkbox', checked: true, click: () => {
			// 更改窗口置顶属性
			if(contextMenu.items[0].checked){
				mainWindow.setAlwaysOnTop(true);
			} else {
				mainWindow.setAlwaysOnTop(false);
			}
		} },
		{ label: '交互', type: 'checkbox', checked: true, click: () => {
			// 更改窗口穿透属性
			if(contextMenu.items[1].checked){
				mainWindow.setIgnoreMouseEvents(false);
			} else {
				mainWindow.setIgnoreMouseEvents(true);
			}
		} },
		{ label: '锁定', type: 'checkbox', checked: true, click: () => {
			// 更改窗口锁定属性
			if(contextMenu.items[2].checked){
				allowMove = false;
			} else {
				allowMove = true;
			}
			mainWindow.resizable = allowMove;
			mainWindow.webContents.send('window-move-open', allowMove)
		} },
		{ label: '退出', click: () => {
			// 退出程序
			app.quit();
			// 销毁托盘图标
			appIcon.destroy();
		} }
	]);
	appIcon.setContextMenu(contextMenu);
	// 点击托盘还原窗口
	appIcon.on('click', () => {
		mainWindow.show();
	});
	// 鼠标悬停托盘显示信息
	appIcon.on('mouse-move', () => {
		appIcon.setToolTip('作者：海之恋SF');
	});
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World!\n');
}).listen(8848);

function windowMove(win) {

  let winStartPosition = {x: 0, y: 0};
  let mouseStartPosition = {x: 0, y: 0};
  let movingInterval = null;

  /**
   * 窗口移动事件
   */
  ipcMain.on("window-move-open", (events, canMoving) => {
    if (canMoving) {
      // 读取原位置
      const winPosition = win.getPosition();
      winStartPosition = { x: winPosition[0], y: winPosition[1] };
      mouseStartPosition = screen.getCursorScreenPoint();
	  const winSize = win.getSize();
      // 清除
      if (movingInterval) {
        clearInterval(movingInterval);
      }
      // 新开
      movingInterval = setInterval(() => {
        // 实时更新位置
        const cursorPosition = screen.getCursorScreenPoint();
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
        win.setPosition(x, y, true);
		// 解决移动中自动增大的BUG
		win.setSize(winSize[0],winSize[1]);
      }, 20);
    } else {
      clearInterval(movingInterval);
      movingInterval = null;
    }
  });
  
}

let allowMove = null;