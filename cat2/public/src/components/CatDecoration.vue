<template>
  <div class="cat-decoration" :class="positionClass">
    🐾
  </div>
</template>

<script>
export default {
  name: 'CatDecoration',
  props: {
    position: {
      type: String,
      default: 'top-left',
      validator: value => ['top-left', 'bottom-right'].includes(value)
    }
  },
  computed: {
    positionClass() {
      return `cat-${this.position === 'top-left' ? '1' : '2'}`;
    }
  }
}
</script>

<style scoped>
.cat-decoration {
  position: absolute;
  opacity: 0.1;
  z-index: -1;
}

.cat-1 {
  top: 10%;
  left: 5%;
  font-size: 10rem;
  transform: rotate(-15deg);
}

.cat-2 {
  bottom: 10%;
  right: 5%;
  font-size: 8rem;
  transform: rotate(15deg);
}
</style>