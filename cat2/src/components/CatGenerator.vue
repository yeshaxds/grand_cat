<template>
  <div class="cat-generator">
    <h1>🐱 随机猫猫生成器 🐾</h1>

    <div class="cat-container">
      <div class="cat-image-container">
        <div v-if="loading" class="loading">加载中...请稍候</div>
        <img v-else :src="catImage" :alt="'随机猫猫图片 ' + catId" class="cat-image">
      </div>
      <div class="controls">
        <button @click="fetchRandomCat">再来一只猫猫</button>
        <button @click="translateToMeow" :disabled="translating">
          {{ translating ? '翻译中...' : '翻译成猫语' }}
        </button>
        <button @click="addTag" v-if="!currentTag">添加标签</button>
      </div>

      <input v-if="currentTag" v-model="newTag" @keyup.enter="saveTag" placeholder="输入标签..." class="tag-input">

      <div v-if="tags.length > 0" class="tags-container">
        <span class="tag" v-for="(tag, index) in tags" :key="index">
          {{ tag }}
          <span @click="removeTag(index)" class="tag-remove">×</span>
        </span>
      </div>

      <div class="meow-box" v-if="translation">
        <strong>猫语翻译:</strong> {{ translation }}
      </div>

      <div class="cat-fact" v-if="catFact">
        <strong>猫猫小知识:</strong> {{ catFact }}
      </div>
    </div>

    <button @click="goToHome" class="return-home">
      🏠 返回喵星
    </button>

    <div class="stats">
      已展示 {{ catCount }} 只猫猫 | 猫猫ID: {{ catId }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'CatGenerator',
  data() {
    return {
      catImage: '',
      catId: '',
      loading: false,
      translation: '',
      translating: false,
      catFact: '',
      catCount: 0,
      tags: [],
      currentTag: false,
      newTag: ''
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    async fetchRandomCat() {
      this.loading = true;
      this.translation = '';
      this.catFact = '';
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        this.catImage = data[0].url;
        this.catId = data[0].id.split('-')[0];
        this.catCount++;

        if (Math.random() > 0.5) {
          await this.fetchCatFact();
        }
      } catch (error) {
        console.error('获取猫猫失败:', error);
        this.catImage = 'https://placekitten.com/500/300';
        this.catId = 'error-' + Date.now();
      } finally {
        this.loading = false;
      }
    },
    async fetchCatFact() {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        this.catFact = data.fact;
      } catch (error) {
        console.error('获取猫猫小知识失败:', error);
      }
    },
    translateToMeow() {
      this.translating = true;
      const phrases = [
        "喵喵喵~ 喵！喵喵喵喵...",
        "喵~ 喵喵！喵喵喵~",
        "喵呜！喵喵... 喵~",
        "喵喵~ 喵喵喵！喵呜~",
        "喵！喵喵喵... 喵喵~"
      ];

      setTimeout(() => {
        this.translation = phrases[Math.floor(Math.random() * phrases.length)];
        this.translating = false;
      }, 1000);
    },
    addTag() {
      this.currentTag = true;
    },
    saveTag() {
      if (this.newTag.trim()) {
        this.tags.push(this.newTag.trim());
        this.newTag = '';
      }
      this.currentTag = false;
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    }
  },
}
</script>

<style scoped>
.cat-generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

h1 {
  color: #ff7e67;
  text-align: center;
}

.cat-container {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  text-align: center;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cat-image-container {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.loading {
  font-style: italic;
  color: #888;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}

.cat-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

button {
  background-color: #ff7e67;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 5px;
  transition: all 0.3s;
}

button:hover {
  background-color: #ff5a3c;
  transform: translateY(-2px);
}

.meow-box {
  background-color: #fff9e6;
  border-left: 5px solid #ffd166;
  padding: 15px;
  margin: 20px 0;
  border-radius: 0 10px 10px 0;
}

.cat-fact {
  margin-top: 20px;
  font-size: 0.9em;
  color: #666;
}

.controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  background-color: #e0f7fa;
  color: #00838f;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 0.8em;
  margin: 3px;
}

.tag-remove {
  cursor: pointer;
  margin-left: 5px;
}

.tag-input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.tags-container {
  margin-top: 10px;
}

.return-home {
  background-color: #a2d5f2;
  color: #07689f;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.return-home:hover {
  transform: translateX(-3px);
}

.stats {
  text-align: center;
  margin-top: 30px;
  font-size: 0.8em;
  color: #888;
}
</style>