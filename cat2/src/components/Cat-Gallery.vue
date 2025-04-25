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
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fdbb44aed2e738bd4ff254584a28b87d6277ff97b.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656578670&t=f5c439b86a9ff1722a1f6ce1eb0c75ea',
    title: '小橘的午后',
    description: '阳光下的慵懒时光'
  },
  {
    url: 'https://soutushenqi.com/image/detail?largeUrl=http%3A%2F%2Fhbimg.huaban.com%2Fdd0a509b25170fb22094a9b0ab0dc0d7f159d03d13e614f-Zb1sQt&desc=%E7%8F%82%E8%8E%B1%E5%A1%94-%E6%82%94%E7%BD%AA%E7%9A%84%E6%9A%AE%E5%AE%B4&width=13653&height=7680&key=DJOhGgCM',
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
      // 先触发特效
      // console.log("答案正确，创建特效！开始添加特效元素...")
      createFloatingCats()
      createConfetti()

      // 延长等待时间，让特效更明显
      setTimeout(() => {
        // console.log("特效即将结束，准备移除特效元素...")
        removeEffects()
        // console.log("进入猫咪乐园...")
        
        // 再等待一小段时间确保动画元素被清理
        setTimeout(() => {
          unlocked.value = true
        }, 500)
      }, 6000)
    } else {
      alert(`答错了呢~ 正确答案是: ${currentQuestion.value.options[currentQuestion.value.answer]}`)
      // 重置答案选择，允许再次尝试
      answered.value = false
      selectedAnswer.value = null
    }
  } else {
    unlocked.value = true
  }
}

// 创建漂浮猫咪特效
const createFloatingCats = () => {
  const cats = ['🐱', '🐈', '🐈‍⬛', '😺', '😸', '😹', '😻', '😼', '😽']
  
  // console.log("开始创建猫咪特效")
  
  // 创建样式标签，确保动画关键帧存在
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
    @keyframes floatUp {
      0% { transform: translateY(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; transform: translateY(-80vh); }
      100% { transform: translateY(-100vh); opacity: 0; }
    }
  `
  document.head.appendChild(styleEl)
  
  for (let i = 0; i < 20; i++) {
    const cat = document.createElement('div')
    cat.textContent = cats[Math.floor(Math.random() * cats.length)]
    
    // 使用内联样式设置所有属性
    Object.assign(cat.style, {
      position: 'fixed',
      zIndex: '9999',
      left: `${Math.random() * 100}vw`,
      bottom: '0',
      fontSize: `${Math.random() * 2 + 1.5}rem`,
      animation: `floatUp ${Math.random() * 3 + 4}s ease-out forwards`,
      animationDelay: `${Math.random() * 2}s`,
      pointerEvents: 'none'
    })
    
    document.body.appendChild(cat)
    // console.log("添加了一个猫咪元素:", cat.textContent)
    
    setTimeout(() => cat.remove(), 8000)
  }
}

// 创建彩色纸屑特效
const createConfetti = () => {
  const colors = ['#ff9a76', '#a2d5f2', '#ff6b6b', '#07689f', '#ffd166', '#06d6a0']
  
  // console.log("开始创建纸屑特效")
  
  // 创建样式标签，确保动画关键帧存在
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
    @keyframes fallDown {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      50% { opacity: 1; transform: translateY(50vh) rotate(360deg); }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `
  document.head.appendChild(styleEl)
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    
    // 使用内联样式设置所有属性
    Object.assign(confetti.style, {
      position: 'fixed',
      zIndex: '9999',
      left: `${Math.random() * 100}vw`,
      top: '0',
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animation: `fallDown ${Math.random() * 2 + 3}s ease-in forwards`,
      animationDelay: `${Math.random() * 1}s`,
      pointerEvents: 'none'
    })
    
    document.body.appendChild(confetti)
    // console.log("添加了一个纸屑元素")
    
    setTimeout(() => confetti.remove(), 5000)
  }
}

// 移除所有特效元素
const removeEffects = () => {
  // console.log("开始移除所有特效元素")
  document.querySelectorAll('style[type="text/css"]').forEach(el => {
    if (el.innerHTML.includes('keyframes floatUp') || el.innerHTML.includes('keyframes fallDown')) {
      el.remove()
    }
  })
  // console.log("特效清理完成")
}

// 显示大图
const showPhoto = (index) => {
  alert(`正在查看: ${photos.value[index].title}\n${photos.value[index].description}`)
}

// 触发文件上传 一种自己设计按钮的方式
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

/* 动画特效已使用JavaScript动态添加，不再需要这些CSS类 */

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

/* 以下动画在JavaScript中动态添加，此处移除 */
</style>