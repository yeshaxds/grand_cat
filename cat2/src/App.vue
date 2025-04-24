<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式可以放在这里或单独的CSS文件 */
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Poppins:wght@400;600&display=swap');

:root {
  --primary: #ff7e67;
  --secondary: #a2d5f2;
  --dark: #07689f;
  --light: #fafafa;
}

body {
  font-family: 'Poppins', 'Ma Shan Zheng', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  padding: 2rem;
  margin: 0 auto;
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
  0% { opacity: 0.7; }
  100% { opacity: 0; }
}
</style>