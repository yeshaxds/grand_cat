<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios";
const router = useRouter()
const cats = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const goToHome = () => {
  // 方案1：普通跳转
  // window.location.href = 'index.html';

  // 或方案2：Vue Router跳转
  router.push('/');
};

// 模态框相关
const showModal = ref(false);
const isEditing = ref(false);
const currentCat = ref({
  id: null,
  name: '',
  appearance: '橘猫',
  age: 1
});

// 根据外貌返回emoji
const getCatEmoji = (appearance) => {
  const emojiMap = {
    '橘猫': '🐈',
    '黑猫': '🐈‍⬛',
    '白猫': '🐱',
    '三花猫': '😺',
    '狸花猫': '😸',
    '奶牛猫': '😹'
  };
  return emojiMap[appearance] || '🐾';
};

// 从SpringBoot后端获取猫咪数据
const fetchCats = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:8080/api/cats', {
      params: { q: searchQuery.value },
      headers: { 'Content-Type': 'application/json' }  // 明确请求头
    });
    console.log('API响应数据:', response.data); // 调试用
    cats.value = response.data;
  } catch (error) {
    console.error('获取猫咪数据失败 - 详细错误:', {
      message: error.message,
      response: error.response,
      config: error.config
    });
    alert(`获取失败: ${error.response?.data || error.message}`);
  } finally {
    loading.value = false;
  }
};

// 显示添加模态框
const showAddModal = () => {
  currentCat.value = {
    id: null,
    name: '',
    appearance: '橘猫',
    age: 1
  };
  isEditing.value = false;
  showModal.value = true;
};

// 显示编辑模态框
const showEditModal = (cat) => {
  currentCat.value = { ...cat };
  isEditing.value = true;
  showModal.value = true;
};

// 保存猫咪(添加或更新)
const saveCat = async () => {
  try {
    if (isEditing.value) {
      // 更新猫咪
      await axios.put(`http://localhost:8080/api/cats/${currentCat.value.id}`, currentCat.value);
    } else {
      // 添加新猫咪
      await axios.post('http://localhost:8080/api/cats', currentCat.value);
    }
    showModal.value = false;
    await fetchCats(); // 刷新列表
  } catch (error) {
    console.error('保存猫咪失败:', error);
    alert('保存猫咪失败，请检查控制台');
  }
};

// 删除猫咪
const deleteCat = async (id) => {
  if (!confirm('确定要删除这只猫咪吗？')) return;

  try {
    await axios.delete(`http://localhost:8080/api/cats/${id}`);
    fetchCats(); // 刷新列表
  } catch (error) {
    console.error('删除猫咪失败:', error);
    alert('删除猫咪失败，请检查控制台');
  }
};

const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐱', '🐈', '🐈‍⬛'];

const createCatEmojiEffect = (x, y) => {
  const emoji = document.createElement('div');
  emoji.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
  emoji.style.position = 'fixed';
  emoji.style.left = `${x}px`;
  emoji.style.top = `${y}px`;
  emoji.style.fontSize = '30px';
  emoji.style.pointerEvents = 'none';
  emoji.style.zIndex = '9999';
  emoji.style.transform = 'translate(-50%, -50%)';
  emoji.style.animation = 'emojiFloat 1.5s ease-out forwards';

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 1500);
};

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
            @keyframes emojiFloat {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -150%) scale(1.5);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// 绑定点击事件
window.addEventListener('click', (e) => {
  createCatEmojiEffect(e.clientX, e.clientY);

  // 50%概率显示爪印
  if (Math.random() > 0.5) {
    const paw = document.createElement('div');
    paw.innerHTML = '🐾';
    paw.style.position = 'fixed';
    paw.style.left = `${e.clientX + (Math.random() * 40 - 20)}px`;
    paw.style.top = `${e.clientY + (Math.random() * 40 - 20)}px`;
    paw.style.fontSize = '24px';
    paw.style.opacity = '0.7';
    paw.style.animation = 'pawFade 2s forwards';
    document.body.appendChild(paw);

    setTimeout(() => paw.remove(), 2000);
  }
});
// 初始化加载数据
fetchCats();
</script>

<template>
  <div class = "CatBoot">
    <div class="container">
      <header>
        <div class="cat-icon">🐱</div>
        <h1>喵喵数据库</h1>
        <p>猫咪信息管理系统</p>
      </header>

      <div class="controls">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索猫咪...">
          <button class="search-btn" @click="fetchCats">搜索</button>
        </div>
        <button class="add-btn" @click="showAddModal">+ 添加新猫咪</button>
      </div>

      <div v-if="loading" class="loading">加载中... 🐾</div>

      <table class="cat-table" v-else>
        <thead>
        <tr>
          <th>ID</th>
          <th>头像</th>
          <th>名字</th>
          <th>外貌</th>
          <th>年龄</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cat in cats" :key="cat.id">
          <td>{{ cat.id }}</td>
          <td>
            <div class="cat-avatar">
              {{ getCatEmoji(cat.appearance) }}
            </div>
          </td>
          <td>{{ cat.name }}</td>
          <td>{{ cat.appearance }}</td>
          <td>{{ cat.age }}岁</td>
          <td>
            <button class="action-btn edit-btn" @click="showEditModal(cat)">编辑</button>
            <button class="action-btn delete-btn" @click="deleteCat(cat.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 添加/编辑猫咪的模态框 -->
      <div class="modal" :class="{ show: showModal }">
        <div class="modal-content">
          <h2>{{ isEditing ? '编辑猫咪' : '添加新猫咪' }}</h2>

          <div class="form-group">
            <label>猫咪名字</label>
            <input type="text" v-model="currentCat.name" placeholder="输入猫咪名字">
          </div>

          <div class="form-group">
            <label>外貌特征</label>
            <select v-model="currentCat.appearance">
              <option value="橘猫">橘猫</option>
              <option value="黑猫">黑猫</option>
              <option value="白猫">白猫</option>
              <option value="三花猫">三花猫</option>
              <option value="狸花猫">狸花猫</option>
              <option value="奶牛猫">奶牛猫</option>
            </select>
          </div>

          <div class="form-group">
            <label>年龄</label>
            <input type="number" v-model="currentCat.age" min="0" max="30">
          </div>

          <div class="modal-footer">
            <button class="action-btn" @click="showModal = false">取消</button>
            <button class="action-btn add-btn" @click="saveCat">
              {{ isEditing ? '更新' : '保存' }}
            </button>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <button
            @click="goToHome"
            class="return_home"
            onmouseover="this.style.transform='translateX(-3px)'"
            onmouseout="this.style.transform='none'"
        >
          🏠 返回喵星
        </button>
      </div>
      <footer>
        <p>© 2023 喵喵数据库 | 共 {{ cats.length }} 只猫咪</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
  color: #333;
}

header {
  background-color: var(--primary);
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
}

.cat-icon {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.controls {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.search-box {
  display: flex;
  align-items: center;
}

input {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  outline: none;
  margin-right: 10px;
}

button {
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
}

.search-btn {
  background: var(--secondary);
  color: var(--dark);
}

.add-btn {
  background: var(--primary);
  color: white;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 5px rgba(0,0,0,0.1);
}

.cat-table {
  width: 100%;
  border-collapse: collapse;
}

.cat-table th, .cat-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.cat-table th {
  background: #f8f8f8;
  color: var(--dark);
}

.cat-table tr:hover {
  background: #f5f5f5;
}

.cat-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.action-btn {
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 0.8rem;
}

.edit-btn {
  background: var(--secondary);
  color: var(--dark);
}

.delete-btn {
  background: #ff6b6b;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}

.modal.show {
  opacity: 1;
  pointer-events: all;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
}

footer {
  text-align: center;
  padding: 15px;
  color: #666;
  font-size: 0.8rem;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
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

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 10px;
  }

  .cat-table {
    display: block;
    overflow-x: auto;
  }
}
</style>