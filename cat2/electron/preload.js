// preload.js
// 在渲染进程加载前被执行的脚本
// 可以在这里设置一些渲染进程可以使用的API

// 所有Node.js API都可以在preload进程中使用
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

// 可以在这里添加额外的功能，例如从主进程到渲染进程的通信 