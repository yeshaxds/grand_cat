<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const previousOperand = ref('');
const currentOperand = ref('');
const operation = ref(null);

// 返回主页
const goToHome = () => {
  // 方案1：普通跳转
  // window.location.href = 'index.html';

  // 或方案2：Vue Router跳转
  router.push('/');
};

// 添加数字
const appendNumber = (number) => {
  if (number === '.' && currentOperand.value.includes('.')) return;
  currentOperand.value = currentOperand.value.toString() + number.toString();
};

// 选择运算符
const chooseOperation = (op) => {
  if (currentOperand.value === '') return;
  if (previousOperand.value !== '') {
    compute();
  }
  operation.value = op;
  previousOperand.value = currentOperand.value;
  currentOperand.value = '';
};

// 在compute()函数最后添加历史记录
const history = ref([]);

// 计算结果
const compute = () => {
  let computation;
  const prev = parseFloat(previousOperand.value);
  const current = parseFloat(currentOperand.value);
  if (isNaN(prev) || isNaN(current)) return;
  // console.log(operation.value)
  switch (operation.value) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand.value = computation;
  var currrent = operation.value;
  operation.value = null;
  previousOperand.value = '';

  history.value.unshift(
      `${prev} ${currrent} ${current} = ${computation}`
  );
  if (history.value.length > 10) history.value.pop();
};

// 清空
const clear = () => {
  currentOperand.value = '';
  previousOperand.value = '';
  operation.value = null;
};

// 删除数字
const deleteNumber = () => {
  currentOperand.value = currentOperand.value.toString().slice(0, -1);
};

const currentCatFact = ref(0);
const catFacts = [
  '猫咪鼻纹像人类指纹一样独特',
  '家猫奔跑速度可达48公里/小时',
  '猫咪用胡须测量空间宽度',
  '猫咪能发出约100种不同声音',
  '猫咪跳跃高度可达自身长度5倍'
];

const changeCatFact = () => {
  currentCatFact.value = (currentCatFact.value + 1) % catFacts.length;
};

const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐱', '🐈', '🐈‍⬛']

const createCatEmojiEffect = (x, y) => {
  const emoji = document.createElement('div')
  emoji.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)]
  emoji.style.position = 'fixed'
  emoji.style.left = `${x}px`
  emoji.style.top = `${y}px`
  emoji.style.fontSize = '30px'
  emoji.style.pointerEvents = 'none'
  emoji.style.zIndex = '9999'
  emoji.style.transform = 'translate(-50%, -50%)'
  emoji.style.animation = 'emojiFloat 1.5s ease-out forwards'
  document.body.appendChild(emoji)
  setTimeout(() => emoji.remove(), 1500)
}

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
</script>

<template>
  <div>
    <div class="main-wrapper">
      <div class="left-decoration">
        <div class="cat-silhouette">🐈</div>
        <div class="cat-fact">
          {{ catFacts[currentCatFact] }}
          <div>
            <button @click="changeCatFact" class="cat-btn">换一个</button>
          </div>
        </div>
      </div>
      <div class="container">
        <header>

          <div class="cat-icon">🐱</div>
          <h1>喵喵计算器</h1>
          <p>专为猫咪设计的计算工具</p>
        </header>

        <div class="calculator">
          <div class="display">
            <div class="previous-operand">{{ previousOperand }} {{ operation }}</div>
            <div class="current-operand">{{ currentOperand || '0' }}</div>
            <div class="cat-paw">🐾</div>
          </div>

          <div class="buttons">
            <button @click="clear" class="clear">AC</button>
            <button @click="deleteNumber" class="delete">DEL</button>
            <button @click="appendNumber('.')" class="number">.</button>
            <button @click="chooseOperation('÷')" class="operator">÷</button>

            <button @click="appendNumber('7')" class="number">7</button>
            <button @click="appendNumber('8')" class="number">8</button>
            <button @click="appendNumber('9')" class="number">9</button>
            <button @click="chooseOperation('×')" class="operator">×</button>

            <button @click="appendNumber('4')" class="number">4</button>
            <button @click="appendNumber('5')" class="number">5</button>
            <button @click="appendNumber('6')" class="number">6</button>
            <button @click="chooseOperation('-')" class="operator">-</button>

            <button @click="appendNumber('1')" class="number">1</button>
            <button @click="appendNumber('2')" class="number">2</button>
            <button @click="appendNumber('3')" class="number">3</button>
            <button @click="chooseOperation('+')" class="operator">+</button>

            <button @click="appendNumber('0')" class="number span-2">0</button>
            <button @click="compute" class="equals span-2">=</button>
          </div>
          <div style="text-align: center; margin-bottom: -15px;">
            <button
                @click="goToHome"
                class="home-btn"
                onmouseover="this.style.transform='translateX(-3px)'"
                onmouseout="this.style.transform='none'"
            >
              🏠 返回喵星
            </button>
          </div>
        </div>

        <footer>
          <p>© 2023 喵喵计算器 | 猫咪也能学会的数学</p>
        </footer>
      </div>
      <div class="right-decoration">
        <div class="yarn-ball"></div>
        <div class="cat-history">
          <h4>计算历史</h4>
          <div v-for="(item, index) in history" :key="index" class="history-item">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 350px;
  width: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
  color: #554f4f;
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

.calculator {
  padding: 20px;
}

.display {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: right;
  font-size: 2rem;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.previous-operand {
  font-size: 1rem;
  color: #666;
  min-height: 1.2rem;
}

.current-operand {
  font-size: 1.8rem;
  word-wrap: break-word;
}

.cat-paw {
  position: absolute;
  opacity: 0.05;
  font-size: 5rem;
  right: 10px;
  bottom: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  border: none;
  border-radius: 10px;
  padding: 15px 0;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
  background-color: #f0f0f0;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 5px rgba(0,0,0,0.1);
}

.span-2 {
  grid-column: span 2;
}

.number {
  background-color: white;
}

.operator {
  background-color: var(--secondary);
  color: var(--dark);
  font-weight: bold;
}

.equals {
  background-color: var(--primary);
  color: white;
}

.clear, .delete {
  background-color: #ff6b6b;
  color: white;
}

footer {
  text-align: center;
  padding: 15px;
  color: #666;
  font-size: 0.8rem;
}
.cat-btn {
  margin-top: 10px;
  background: rgba(219, 236, 228, 0.71);
  border: none;
  padding: 8px 15px;
  color: #ff9fdc;
  font-family: 'Ma Shan Zheng', cursive;
  border: 1px solid rgba(189, 177, 104, 0.5);
}
.home-btn {
  margin-top: 10px;
  background: rgba(255,255,255,0.3);
  border: none;
  padding: 8px 15px;
  color: #65e03e;
  font-family: 'Ma Shan Zheng', cursive;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(182, 163, 60, 0.5);
}

.home-btn:hover {
  background: rgba(127, 182, 88, 0.5);
  transform: translateX(-3px);
}

/* 新增的左右边栏样式 */
.main-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
}

.left-decoration, .right-decoration {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

/* 左侧装饰元素 */
.cat-silhouette {
  font-size: 5rem;
  opacity: 0.5;
  margin-bottom: 30px;
}

.cat-fact {
  background: rgba(255,255,255,0.7);
  padding: 15px;
  border-radius: 15px;
  border: 1px dashed var(--primary);
  text-align: center;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  color: #1b0f0f;
}

/* 右侧装饰元素 */
.yarn-ball {
  width: 80px;
  height: 80px;
  background: conic-gradient(
      #ff9a76, #a2d5f2, #ff6b6b, #07689f,
      #ff9a76, #a2d5f2, #ff6b6b, #07689f
  );
  border-radius: 50%;
  margin-bottom: 30px;
  animation: spin 8s linear infinite;
}
.cat-history{
  color: #353232;
}
.history-item {
  padding: 8px;
  border-bottom: 1px dotted #eee;
  font-size: 0.8rem;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* 响应式调整 */
@media (max-width: 900px) {
  .left-decoration, .right-decoration {
    display: none;
  }
}
</style>