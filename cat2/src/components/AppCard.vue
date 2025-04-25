<template>
  <div class="app-card" @click="$emit('click')">
    <div class="app-icon">{{ icon }}</div>
    <h2 class="app-title">{{ title }}</h2>
    <p class="app-desc">{{ description }}</p>
    <button class="btn" @click.stop="handleClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: String,
  title: String,
  description: String,
  buttonText: String,
  route: String
})

const router = useRouter()

const handleClick = () => {
  if (props.route) {
    router.push(props.route)
  }
}
</script>


<style scoped>
.app-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  /* 控制浮动 */
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: fadeIn 3s cubic-bezier(0.88, -0.04, 0.12, 0.98);
}

.app-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.app-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--primary);
}

.app-card:nth-child(2)::before {
  background: var(--secondary);
}

.app-card:nth-child(3)::before {
  background: #a8df65;
}

.app-card:nth-child(4)::before {
  background: #a80f61;
}

.app-card:nth-child(5)::before {
  background: #ffd166;
}

.app-card:nth-child(6)::before {
  background: #2f31cc;
}

.app-card:nth-child(7)::before {
  background: #e36c48;
}

.app-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.app-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--dark);
}

.app-desc {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--primary);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: var(--dark);
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>