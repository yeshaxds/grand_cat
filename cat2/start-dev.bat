@echo off
echo 正在启动喵喵猫舍开发模式...

:: 检查electron目录是否存在
if not exist "electron\electron.exe" (
    echo 错误：未找到electron.exe，请确保已正确解压Electron到electron目录
    pause
    exit /b 1
)

:: 设置环境变量
set ELECTRON_RUN_AS_NODE=0
set ELECTRON_NO_ATTACH_CONSOLE=1
set NODE_ENV=development

:: 启动Vite开发服务器
start cmd /k "npm run dev"

:: 等待Vite服务器启动
timeout /t 5

:: 启动Electron
start electron\electron.exe . 