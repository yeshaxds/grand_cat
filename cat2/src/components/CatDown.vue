<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'

const router = useRouter()
const markdownText = ref('# 欢迎使用喵喵笔记本\n\n这是一个支持**Markdown**的可爱笔记本！\n\n## 功能特色\n\n- 🐱 猫咪主题设计\n- 📝 实时Markdown预览\n- 💾 本地文件保存/读取\n\n```javascript\nconsole.log("Hello, 喵喵!");\n```');
const catWords = {
  prefixes: ['喵', '咪', '毛球', '爪爪', '尾巴', '肉垫', '咕噜', '呼噜', '奶猫', '布偶'],
  suffixes: ['日记', '笔记', '随笔', '手账', '备忘录', '记录', '文档', '草稿', '创作', '灵感']
};
// 已使用的文件名记录
const usedFileNames = ref(new Set());            // 生成随机猫咪文件名
const generateCatFileName = () => {
  const prefix = catWords.prefixes[Math.floor(Math.random() * catWords.prefixes.length)];
  const suffix = catWords.suffixes[Math.floor(Math.random() * catWords.suffixes.length)];
  let randomNum = Math.floor(Math.random() * 100);

  let fileName = `${prefix}的${suffix}_${randomNum}.txt`;
  let attempts = 0;

  // 确保文件名不重复
  while (usedFileNames.value.has(fileName) && attempts < 100) {
    randomNum = Math.floor(Math.random() * 100);
    fileName = `${prefix}的${suffix}_${randomNum}.txt`;
    attempts++;
  }

  usedFileNames.value.add(fileName);
  return fileName;
};


const compiledMarkdown = computed(() => {
  return marked.parse(markdownText.value);
});

const saveToFile = async () => {
  try {
    const fileName = generateCatFileName();
    const blob = new Blob([markdownText.value], { type: 'text/plain;charset=utf-8' });

    // 使用showSaveFilePicker API (现代浏览器支持)
    if ('showSaveFilePicker' in window) {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: '文本文件',
          accept: { 'text/plain': ['.txt'] }
        }]
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

      alert(`文件已保存为: ${handle.name}`);
    }
    // 兼容旧版浏览器
    else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert(`文件已保存为: ${fileName}`);
    }
  } catch (err) {
    console.error('保存失败:', err);
    alert('保存失败，请重试或使用其他浏览器');
  }
};


const loadFromFile = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt,.md';

  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = event => {
      markdownText.value = event.target.result;
    };

    reader.readAsText(file);
  };

  input.click();
};

// 快捷键保存
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveToFile();
  }
});
const goToHome = () => {
  // 方案1：普通跳转
  // window.location.href = 'index.html';

  // 或方案2：Vue Router跳转
  router.push('/');
};
</script>

<template>
  <div class="catdown">
    <div class="main-wrapper">
      <div class="left-decoration">
        <div class="cat-silhouette">🐱</div>
        <div class="cat-tip">
          <h4>🐾 Markdown小贴士</h4>
          <p># 一级标题</p>
          <p>## 二级标题</p>
          <p>**粗体**</p>
          <p>*斜体*</p>
          <p>- 列表项</p>
          <p>[链接](网址)</p>
        </div>
      </div>

      <div class="container">
        <header>
          <div class="cat-icon">📝</div>
          <h1>喵喵Markdown笔记本</h1>
          <p>专为猫咪设计的写作工具</p>
        </header>

        <div class="editor-container">
          <textarea class="editor" v-model="markdownText" placeholder="在这里输入Markdown内容..."></textarea>
          <div class="preview" v-html="compiledMarkdown"></div>
        </div>

        <div class="toolbar">
          <button class="save-btn" @click="saveToFile">
            <span>💾</span> 保存到文件
          </button>
          <button class="load-btn" @click="loadFromFile">
            <span>📂</span> 从文件读取
          </button>
          <div style="text-align: center;">
            <button @click="goToHome" class="return_home" onmouseover="this.style.transform='translateX(-3px)'"
              onmouseout="this.style.transform='none'">
              🏠 返回喵星
            </button>
          </div>
        </div>

      </div>

    </div>

    <footer>
      <p>© 2023 喵喵笔记本 | 按Ctrl+S可快速保存</p>
    </footer>
  </div>
</template>

<style scoped>
.catdown {
  --primary: #ff9a76;
  --secondary: #a2d5f2;
  --dark: #07689f;
  --light: #fafafa;
}

.main-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
}

.container {
  flex: 1;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

header {
  background-color: var(--primary);
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.cat-icon {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
}

.editor-container {
  display: flex;
  height: 500px;
}

.editor,
.preview {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.editor {
  font-family: 'Poppins', monospace;
  resize: none;
  outline: none;
  border: none;
  font-size: 0.95rem;
  line-height: 1.6;
}

.preview {
  color: #222;
  background: #f8f8f8;
}

.preview img {
  max-width: 100%;
}

.toolbar {
  display: flex;
  padding: 10px 20px;
  background: #f0f0f0;
  border-top: 1px solid #eee;
}

button {
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
  background-color: white;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

button i {
  margin-right: 5px;
  font-size: 1.1rem;
}

.save-btn {
  background-color: var(--secondary);
  color: var(--dark);
}

.load-btn {
  background-color: var(--primary);
  color: white;
}

.left-decoration {
  width: 200px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
}

.cat-silhouette {
  font-size: 3rem;
  text-align: center;
  opacity: 0.2;
  margin-bottom: 15px;
}

.cat-tip {
  background: rgba(255, 154, 118, 0.09);
  padding: 15px;
  border-radius: 15px;
  border: 1px dashed var(--primary);
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #222;
}

.return_home {
  background-color: #a2d5f2;
  color: #07689f;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;

}

footer {
  text-align: center;
  padding: 15px;
  color: #666;
  font-size: 0.8rem;
  margin-top: 30px;
}

@media (max-width: 900px) {
  .main-wrapper {
    flex-direction: column;
  }

  .left-decoration {
    width: 100%;
    margin-bottom: 20px;
  }

  .editor-container {
    flex-direction: column;
    height: auto;
  }

  .editor,
  .preview {
    height: 300px;
  }
}
</style>