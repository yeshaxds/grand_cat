<template>
  <div class="container">
    <AppHeader />

    <div class="apps-grid">
      <AppCard v-for="app in apps" :icon="app.icon" :title="app.title" :description="app.description"
        :buttonText="app.buttonText" :route="app.route" />
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
}
</script>

<style scoped>
.container {
  text-align: center;
}

.apps-grid {
  display: grid;
  grid-template-columns: [start] 1fr [middle] 1fr [middle2] 1fr [end];
  /* grid-template-rows: [top] 100px [center] auto [bottom]; */
  gap: 2rem;
  /* padding: 1rem; */

}

footer {
  margin-top: 4rem;
  color: #666;
  font-size: 0.9rem;
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
  0% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .apps-grid {
    display: grid;
    grid-template-columns: [start] 1fr [end];
    padding: 1rem;
  }
}
</style>