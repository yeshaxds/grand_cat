// 这个文件使用CommonJS语法，因为Electron使用Node.js环境
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

// 设置错误处理
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
});

// 保持对window对象的全局引用
let mainWindow;

function createWindow() {
  try {
    console.log('正在创建窗口...');
    
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js')
      },
      icon: path.join(__dirname, '../public/favicon.ico'),
      title: '喵喵猫舍',
      show: false // 先不显示窗口，等加载完成后再显示
    });

    // 检查dist目录是否存在
    const distPath = path.join(__dirname, '../dist');
    const isDev = !fs.existsSync(distPath);

    console.log('当前运行模式:', isDev ? '开发模式' : '生产模式');

    // 加载应用
    if (isDev) {
      // 开发环境下，加载Vite开发服务器
      mainWindow.loadURL('http://localhost:5173');
      // 打开开发者工具
      mainWindow.webContents.openDevTools();
    } else {
      // 生产环境下，加载打包后的文件
      const indexPath = path.join(distPath, 'index.html');
      if (!fs.existsSync(indexPath)) {
        throw new Error('未找到index.html文件，请先运行npm run build');
      }
      mainWindow.loadURL(url.format({
        pathname: indexPath,
        protocol: 'file:',
        slashes: true
      }));
    }

    // 加载完成后显示窗口
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      console.log('窗口已显示');
    });

    // 关闭窗口时触发
    mainWindow.on('closed', function () {
      console.log('窗口已关闭');
      mainWindow = null;
    });

    // 处理加载错误
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('加载失败:', errorCode, errorDescription);
    });

  } catch (error) {
    console.error('创建窗口时出错:', error);
  }
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
app.whenReady().then(() => {
  console.log('Electron已就绪');
  createWindow();
});

// 当全部窗口关闭时退出
app.on('window-all-closed', function () {
  console.log('所有窗口已关闭');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  console.log('应用被激活');
  if (mainWindow === null) {
    createWindow();
  }
}); 