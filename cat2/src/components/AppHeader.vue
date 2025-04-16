<template>
  <header>
    <h1>喵星人乐园</h1>
    <p class="subtitle">专为爱猫人士打造的趣味工具集合</p>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
header {
  margin-bottom: 3rem;
  animation: fadeIn 1s ease;
}

h1 {
  font-size: 3.5rem;
  color: var(--dark);
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 2rem;
}
</style>