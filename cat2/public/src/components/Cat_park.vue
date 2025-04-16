<template>
  <div class="cat-park-container">
    <div ref="webglContainer" class="webgl-container"></div>

    <div class="header">
      <h1>🐱 3D喵星人乐园 🐱</h1>
    </div>

    <div class="cat-counter">
      当前猫咪: {{ catCount }}只
    </div>

    <div class="controls">
      <button @click="addCat">添加猫咪</button>
      <button @click="changeBg">更换背景</button>
      <button @click="toggleAnimation">{{ isAnimating ? '暂停' : '开始' }}动画</button>
      <button
          @click="goToHome"
          class="return_home"
          @mouseover="hoverHomeButton(true)"
          @mouseout="hoverHomeButton(false)"
      >
        🏠 返回喵星
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CatModel from './js_need/CatModel.js';
import { useRouter } from 'vue-router'

export default {
  name: 'CatPark',
  setup() {
    // 响应式状态
    const catCount = ref(0);
    const isAnimating = ref(true);
    const webglContainer = ref(null);
    const router = useRouter()
    // Three.js 相关变量
    let scene, renderer, camera, controls;
    const cats = ref([]);
    const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐱', '🐈', '🐈‍⬛'];


    const goToHome = () => {
      // 方案1：普通跳转
      // window.location.href = 'index.html';

      // 或方案2：Vue Router跳转
      router.push('/');
    };
    // 初始化场景
    const initScene = () => {
      // 创建场景
      scene = new THREE.Scene();

      // 创建渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xf5f7fa);
      webglContainer.value.appendChild(renderer.domElement);

      // 创建相机
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // 添加控制器
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // 添加光源
      const light1 = new THREE.DirectionalLight(0xffffff, 1);
      light1.position.set(1, 1, 1);
      scene.add(light1);

      const light2 = new THREE.AmbientLight(0x404040);
      scene.add(light2);
    };

    // 添加猫咪
    const addCat = () => {
      const cat = CatModel.create();
      scene.add(cat);
      cats.value.push(cat);
      catCount.value = cats.value.length;
    };

    // 更换背景
    const changeBg = () => {
      const colors = [0xf5f7fa, 0xfff5f5, 0xf0fff0, 0xf0f8ff];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      renderer.setClearColor(randomColor);
    };

    // 切换动画
    const toggleAnimation = () => {
      isAnimating.value = !isAnimating.value;
    };

    // 窗口大小调整
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      if (isAnimating.value) {
        cats.value.forEach(cat => {
          cat.rotation.y += cat.userData.speed;
          cat.position.x += cat.userData.direction.x * 0.01;
          cat.position.y += cat.userData.direction.y * 0.01;
          cat.position.z += cat.userData.direction.z * 0.01;

          // 边界检查
          if (Math.abs(cat.position.x) > 5) cat.userData.direction.x *= -1;
          if (Math.abs(cat.position.y) > 3) cat.userData.direction.y *= -1;
          if (Math.abs(cat.position.z) > 5) cat.userData.direction.z *= -1;
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };


    // 首页按钮悬停效果
    const hoverHomeButton = (isHovering) => {
      const button = document.querySelector('.return_home');
      if (button) {
        button.style.transform = isHovering ? 'translateX(-3px)' : 'none';
      }
    };

    // 创建猫咪表情效果
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
      setTimeout(() => emoji.remove(), 1500);
    };

    // 创建爪印效果
    const createPawEffect = (x, y) => {
      const paw = document.createElement('div');
      paw.innerHTML = '🐾';
      paw.style.position = 'fixed';
      paw.style.left = `${x + (Math.random() * 40 - 20)}px`;
      paw.style.top = `${y + (Math.random() * 40 - 20)}px`;
      paw.style.fontSize = '24px';
      paw.style.opacity = '0.7';
      paw.style.animation = 'pawFade 2s forwards';
      document.body.appendChild(paw);

      setTimeout(() => paw.remove(), 2000);
    };

    // 点击事件处理
    const handleClick = (e) => {
      createCatEmojiEffect(e.clientX, e.clientY);
      if (Math.random() > 0.5) {
        createPawEffect(e.clientX, e.clientY);
      }
    };

    onMounted(() => {
      initScene();
      // 初始添加3只猫
      for (let i = 0; i < 3; i++) {
        addCat();
      }
      animate();
      window.addEventListener('resize', onWindowResize);
      window.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', handleClick);
      // 清理Three.js资源
      if (renderer) {
        renderer.dispose();
      }
    });

    return {
      catCount,
      isAnimating,
      webglContainer,
      addCat,
      changeBg,
      toggleAnimation,
      goToHome,
      hoverHomeButton
    };
  }
};
</script>

<style scoped>

.cat-park-container {
  color: #333;
}

.webgl-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.header {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 100;
  pointer-events: none;
}

h1 {
  font-size: 3rem;
  color: var(--primary);
  text-shadow: 3px 3px 0 rgba(0,0,0,0.1);
  margin-bottom: 10px;
}

.controls {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 15px;
}

button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255,154,118,0.3);
}

.cat-counter {
  position: absolute;
  top: 30px;
  right: 30px;
  background: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
  display: inline-block;
}
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  .controls {
    flex-direction: column;
    width: 80%;
  }
}
</style>

<style>
/* 全局动画样式 */
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
</style>