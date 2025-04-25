<template>
  <div class="cat-park">
    <!-- 答题界面 -->
    <div class="quiz-container" v-if="!unlocked">
      <div class="quiz-header">
        <div class="cat-icon">🐱</div>
        <h1>喵喵乐园入场测试</h1>
        <p>答对问题才能进入猫咪乐园哦~</p>
      </div>

      <div class="quiz-question">{{ currentQuestion.text }}</div>

      <div class="quiz-options">
        <button v-for="(option, index) in currentQuestion.options" :key="index" class="option-btn"
          @click="selectAnswer(index)" :class="{ 'selected': selectedAnswer === index }">
          {{ option }}
        </button>
      </div>

      <button class="submit-btn" @click="checkAnswer">
        {{ answered ? '进入乐园' : '提交答案' }}
      </button>
    </div>

    <!-- 画廊界面 -->
    <div class="gallery-container" v-if="unlocked">
      <div class="gallery-header">
        <h1 class="gallery-title">🐾 喵喵乐园 🐾</h1>
        <p>欢迎来到猫咪的秘密花园！</p>
      </div>

      <div class="photo-grid">
        <div class="photo-card" v-for="(photo, index) in photos" :key="index" @click="showPhoto(index)">
          <img :src="photo.url" :alt="photo.title" class="photo-img">
          <div class="photo-caption">
            <h3>{{ photo.title }}</h3>
            <p>{{ photo.description }}</p>
          </div>
        </div>
      </div>

      <div class="upload-section">
        <h3>上传你的猫咪照片</h3>
        <p>与大家分享你家主子的可爱瞬间</p>
        <input type="file" id="photo-upload" accept="image/*" style="display: none;" @change="handleUpload" multiple>
        <button class="upload-btn" @click="triggerUpload">
          <span class="upload-icon">📷</span> 选择照片
        </button>
      </div>

      <div style="text-align: center;">
        <button @click="goToHome" class="return-home" @mouseover="hoverHomeButton(true)"
          @mouseout="hoverHomeButton(false)">
          🏠 返回主页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const unlocked = ref(false)
const selectedAnswer = ref(null)
const answered = ref(false)
const correct = ref(false)
const loading = ref(false)

// 题库
const questions = [
  {
    text: "猫咪一天要睡多少小时？",
    options: ["8-10小时", "12-16小时", "18-20小时", "2-4小时"],
    answer: 1
  },
  {
    text: "以下哪种食物猫咪不能吃？",
    options: ["鸡胸肉", "三文鱼", "巧克力", "胡萝卜"],
    answer: 2
  },
  {
    text: "猫咪用哪个部位散热？",
    options: ["耳朵", "尾巴", "肉垫", "胡须"],
    answer: 2
  }
]

// 随机选择一个问题
const currentQuestion = ref(
  questions[Math.floor(Math.random() * questions.length)]
)

// 猫咪照片库
const photos = ref([
  {
    url: 'https://placekitten.com/800/600',
    title: '小橘的午后',
    description: '阳光下的慵懒时光'
  },
  {
    url: 'https://placekitten.com/801/600',
    title: '奶糖的凝视',
    description: '你在看我吗？'
  },
  {
    url: 'https://placekitten.com/802/600',
    title: '黑豆的好奇',
    description: '发现新玩具啦！'
  },
  {
    url: 'https://placekitten.com/803/600',
    title: '布丁的优雅',
    description: '皇家气质尽显'
  },
  {
    url: 'https://placekitten.com/804/600',
    title: '花卷的睡姿',
    description: '睡成一只海参'
  },
  {
    url: 'https://placekitten.com/805/600',
    title: '芝麻的冒险',
    description: '探索纸箱王国'
  }
])

// 选择答案
const selectAnswer = (index) => {
  if (!answered.value) {
    selectedAnswer.value = index
  }
}

// 检查答案
const checkAnswer = () => {
  if (selectedAnswer.value === null && !answered.value) {
    alert('请先选择一个答案哦~')
    return
  }

  if (!answered.value) {
    answered.value = true
    correct.value = selectedAnswer.value === currentQuestion.value.answer

    if (correct.value) {
      createFloatingCats()
      createConfetti()

      setTimeout(() => {
        removeEffects()
        unlocked.value = true
      }, 1500)
    } else {
      alert(`答错了呢~ 正确答案是: ${currentQuestion.value.options[currentQuestion.value.answer]}`)
    }
  } else {
    unlocked.value = true
  }
}

// 创建漂浮猫咪特效
const createFloatingCats = () => {
  const cats = ['🐱', '🐈', '🐈‍⬛', '😺', '😸', '😹', '😻', '😼', '😽']
  for (let i = 0; i < 20; i++) {
    const cat = document.createElement('div')
    cat.className = 'floating-cat'
    cat.textContent = cats[Math.floor(Math.random() * cats.length)]
    cat.style.left = `${Math.random() * 100}vw`
    cat.style.animationDelay = `${Math.random() * 5}s`
    cat.style.fontSize = `${Math.random() * 2 + 1.5}rem`
    document.body.appendChild(cat)

    setTimeout(() => cat.remove(), 10000)
  }
}

// 创建彩色纸屑特效
const createConfetti = () => {
  const colors = ['#ff9a76', '#a2d5f2', '#ff6b6b', '#07689f', '#ffd166', '#06d6a0']
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = `${Math.random() * 100}vw`
    confetti.style.width = `${Math.random() * 10 + 5}px`
    confetti.style.height = `${Math.random() * 10 + 5}px`
    confetti.style.animationDelay = `${Math.random() * 0.5}s`
    document.body.appendChild(confetti)

    setTimeout(() => confetti.remove(), 3000)
  }
}

// 移除所有特效元素
const removeEffects = () => {
  document.querySelectorAll('.floating-cat, .confetti').forEach(el => el.remove())
}

// 显示大图
const showPhoto = (index) => {
  alert(`正在查看: ${photos.value[index].title}\n${photos.value[index].description}`)
}

// 触发文件上传
const triggerUpload = () => {
  document.getElementById('photo-upload').click()
}

// 处理上传
const handleUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          photos.value.unshift({
            url: e.target.result,
            title: `我的猫咪照片 ${photos.value.length + 1}`,
            description: '上传于 ' + new Date().toLocaleDateString()
          })
        }
        reader.readAsDataURL(file)
      }
    }
    createConfetti()
    alert(`成功上传了 ${files.length} 张猫咪照片！`)
  }
}

// 返回主页
const goToHome = () => {
  router.push('/')
}

// 按钮悬停效果
const hoverHomeButton = (isHovering) => {
  const btn = document.querySelector('.return-home')
  if (btn) {
    btn.style.transform = isHovering ? 'translateX(-3px)' : 'none'
  }
}

</script>

<style scoped>
.cat-park {
  --primary: #ff9a76;
  --secondary: #a2d5f2;
  --dark: #07689f;
  --light: #fafafa;
  color: #222
}

/* 答题界面样式 */
.quiz-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  z-index: 10;
  transform: scale(0.9);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.quiz-header {
  margin-bottom: 20px;
  position: relative;
}

.cat-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

h1 {
  color: var(--dark);
  margin-bottom: 10px;
}

.quiz-question {
  font-size: 1.2rem;
  margin: 20px 0;
  color: #333;
}

.quiz-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 12px;
  border: 2px solid var(--secondary);
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
}

.option-btn:hover {
  background: var(--secondary);
  transform: translateY(-3px);
}

.option-btn.selected {
  background: var(--secondary);
  color: white;
  border-color: var(--dark);
  font-weight: bold;
}

.submit-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 154, 118, 0.3);
}

/* 画廊界面样式 */
.gallery-container {
  display: block;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f1fe 100%);
}

.gallery-header {
  text-align: center;
  padding: 20px;
  position: relative;
}

.gallery-title {
  font-size: 2.5rem;
  color: var(--dark);
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.photo-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
}

.photo-card:hover {
  transform: translateY(-10px) rotate(2deg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.photo-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.photo-caption {
  padding: 15px;
  text-align: center;
  background: white;
}

.return-home {
  background-color: var(--secondary);
  color: var(--dark);
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  margin: 15px auto;
}

/* 上传区域 */
.upload-section {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.upload-btn {
  background: var(--secondary);
  color: var(--dark);
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 15px;
  display: inline-flex;
  align-items: center;
}

.upload-btn:hover {
  background: var(--primary);
  color: white;
}

.upload-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

/* 动画定义 */
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

@keyframes pawFade {
  0% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: 0.7;
  }

  90% {
    opacity: 0.7;
  }

  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}
</style>