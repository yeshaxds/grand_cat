<template>
  <div class="container">
    <AppHeader />

    <div class="apps-grid">
      <AppCard
          v-for="app in apps"
          :icon="app.icon"
          :title="app.title"
          :description="app.description"
          :buttonText="app.buttonText"
          :route="app.route"
      />
    </div>

    <footer>
      <p>© 2023 喵星人乐园 | 用❤️为猫咪爱好者打造</p>
    </footer>

    <CatDecoration position="top-left" />
    <CatDecoration position="bottom-right" />

  </div>

</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppCard from '../components/AppCard.vue'
import CatDecoration from '../components/CatDecoration.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppCard,
    CatDecoration
  },
  data() {
    return {
      apps: [
        {
          id: 1,
          icon: '🐱',
          title: '随机猫猫生成器',
          description: '点击获取世界各地可爱的猫咪照片，还能学习猫咪小知识！',
          buttonText: '立即体验',
          route: '/CatGenerator'
        },
        {
          id: 2,
          icon: '🎵',
          title: '猫咪音乐厅',
          description: '放松心情，聆听专为猫咪设计的舒缓音乐，你和主子都会喜欢~',
          buttonText: '播放音乐',
          route: '/music-player'
        },
        {
          id: 3,
          icon: '🧮',
          title: '喵喵计算器',
          description: '带猫咪主题的趣味计算器，让数学计算不再枯燥！',
          buttonText: '开始计算',
          route: '/calculator'
        },
        {
          id: 4,
          icon: '🐈‍',
          title: '猫咪秘密基地',
          description: '只属于你的秘密花园',
          buttonText: '小心探寻',
          route: '/Cat-Gallery'
        },
        {
          id: 5,
          icon: '📝',
          title: '猫咪记事本',
          description: '放松心情，聆听专为猫咪设计的舒缓音乐，你和主子都会喜欢~',
          buttonText: '开始记录',
          route: '/CatDown'
        },
        {
          id: 6,
          icon: '🐭',
          title: '猫咪花名册',
          description: '放松心情，聆听专为猫咪设计的舒缓音乐，你和主子都会喜欢~',
          buttonText: '点名',
          route: '/Cat-Boot'
        },
        {
          id: 7,
          icon: '😼',
          title: '猫咪游乐园',
          description: '放松心情，聆听专为猫咪设计的舒缓音乐，你和主子都会喜欢~',
          buttonText: '出发！！！',
          route: '/Cat_Park'
        }
      ]
    }
  },
  mounted() {
    // 添加点击效果
    const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐱', '🐈', '🐈‍⬛'];

    window.addEventListener('click', (e) => {
      this.createCatEmojiEffect(e.clientX, e.clientY, catEmojis);

      if (Math.random() > 0.5) {
        this.createPawPrint(e.clientX, e.clientY);
      }
    });
  },
  methods: {
    createCatEmojiEffect(x, y, emojis) {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
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
    },
    navigateTo(page) {
      window.location.href = `${page}.html`;
    },
    createPawPrint(x, y) {
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
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;

}

footer {
  margin-top: 4rem;
  color: #666;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

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
  0% { opacity: 0.7; }
  100% { opacity: 0; }
}
</style>