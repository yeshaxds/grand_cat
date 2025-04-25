<template>
  <div class="music-player">
    <div class="container">
      <header>
        <div class="cat-ears">🐱</div>
        <h1>喵喵音乐厅</h1>
        <p>专为猫咪和铲屎官设计的放松音乐</p>
      </header>

      <div class="player-container">
        <div class="album-art" :class="{ default: !currentSong.cover, playing: isPlaying }">
          <img v-if="currentSong.cover" :src="currentSong.cover" alt="Album Art">
          <div class="cat-icon">🎵</div>
        </div>

        <div class="song-info">
          <h2 class="song-title">{{ currentSong.title || '请选择歌曲' }}</h2>
          <p class="artist">{{ currentSong.artist || '喵星人艺术家' }}</p>
        </div>

        <div class="progress-container">
          <div class="progress-bar" @click="seekAudio">
            <div class="progress" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="time-info">
            <span>{{ currentTime }}</span>
            <span>{{ duration }}</span>
          </div>
        </div>

        <div class="controls">
          <button class="control-btn" @click="prevSong">⏮</button>
          <button class="control-btn" @click="toggleShuffle" :style="{ color: shuffle ? 'var(--primary)' : '' }">
            🔀
          </button>
          <button class="play-btn" @click="togglePlay">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="control-btn" @click="toggleRepeat" :style="{ color: repeat ? 'var(--primary)' : '' }">
            🔁
          </button>
          <button class="control-btn" @click="nextSong">⏭</button>
        </div>

        <div class="playlist">
          <h2>🐾 猫咪歌单 🐾</h2>
          <div class="song-item" v-for="(song, index) in playlist" :key="index"
            :class="{ active: currentSongIndex === index }" @click="playSong(index)">
            <img :src="song.cover || 'https://placekitten.com/50/50'" alt="Cover">
            <div class="song-item-info">
              <div class="song-item-title">{{ song.title }}</div>
              <div class="song-item-artist">{{ song.artist }}</div>
            </div>
            <div class="song-item-duration">{{ song.duration }}</div>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 15px;">
        <button @click="goToHome" class="return_home">
          🏠 返回主页
        </button>
      </div>

      <footer>
        <p>© 2023 喵喵音乐厅 | 用音乐治愈每只猫咪</p>
      </footer>
    </div>

    <div class="cat-paw paw-1">🐾</div>
    <div class="cat-paw paw-2">🐾</div>

    <audio ref="audioPlayer" @timeupdate="updateProgress" @ended="onSongEnd"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const audioPlayer = ref(null)
const isPlaying = ref(false)
const progress = ref(0)
const currentTime = ref('0:00')
const duration = ref('0:00')
const shuffle = ref(false)
const repeat = ref(false)
const currentSongIndex = ref(0)

const playlist = ref([
  {
    title: "猫咪协奏曲",
    artist: "莫扎特喵",
    duration: "3:22",
    cover: "https://placekitten.com/200/200",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "午睡小夜曲",
    artist: "贝多芬喵",
    duration: "2:45",
    cover: "https://placekitten.com/201/201",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "抓沙发狂想曲",
    artist: "李斯特喵",
    duration: "4:12",
    cover: "https://placekitten.com/202/202",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "猫薄荷圆舞曲",
    artist: "肖邦喵",
    duration: "3:56",
    cover: "https://placekitten.com/203/203",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    title: "午夜喵喵歌",
    artist: "喵星人合唱团",
    duration: "2:18",
    cover: "https://placekitten.com/204/204",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
  // 其他歌曲...
])

const currentSong = ref({})

// 初始化播放器
onMounted(() => {
  currentSong.value = { ...playlist.value[0] }
  audioPlayer.value.src = currentSong.value.audio
  audioPlayer.value.addEventListener('loadedmetadata', () => {
    duration.value = formatTime(audioPlayer.value.duration)
  })
})

// 播放/暂停
const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// 其他方法...
const goToHome = () => {
  router.push('/')
}

</script>

<style scoped>
.music-player {
  --primary: #ff9a76;
  --secondary: #a2d5f2;
  --dark: #07689f;
  --light: #fafafa;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Ma Shan Zheng', cursive;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

header {
  background-color: var(--primary);
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.cat-ears {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
}

.player-container {
  padding: 20px;
}

.album-art {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  border: 5px solid white;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-art .cat-icon {
  font-size: 5rem;
  color: var(--dark);
  display: none;
}

.album-art.default .cat-icon {
  display: block;
}

.song-info {
  text-align: center;
  margin-bottom: 20px;
}

.song-title {
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: var(--dark);
}

.artist {
  font-size: 1.2rem;
  color: #666;
}

.progress-container {
  margin: 25px 0;
}

.progress-bar {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-bottom: 5px;
  cursor: pointer;
}

.progress {
  height: 100%;
  background-color: var(--primary);
  border-radius: 3px;
  width: 0%;
  transition: width 0.1s linear;
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.control-btn {
  background: none;
  border: none;
  font-size: 2rem;
  margin: 0 15px;
  cursor: pointer;
  color: var(--dark);
  transition: all 0.3s;
}

.control-btn:hover {
  color: var(--primary);
  transform: scale(1.1);
}

.play-btn {
  background-color: var(--primary);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 5px 15px rgba(255, 154, 118, 0.4);
}

.play-btn:hover {
  transform: scale(1.05);
}

.playlist {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.playlist h2 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--dark);
  font-size: 1.5rem;
}

.song-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.song-item:hover {
  background-color: rgba(162, 213, 242, 0.2);
}

.song-item.active {
  background-color: rgba(255, 154, 118, 0.2);
}

.song-item img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 15px;
  object-fit: cover;
}

.song-item-info {
  flex-grow: 1;
}

.song-item-title {
  font-weight: bold;
  margin-bottom: 3px;
}

.song-item-artist {
  font-size: 0.9rem;
  color: #666;
}

.song-item-duration {
  font-size: 0.9rem;
  color: #999;
}

footer {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;
}

.cat-paw {
  position: fixed;
  opacity: 0.05;
  z-index: -1;
  font-size: 10rem;
}

.paw-1 {
  bottom: 10%;
  left: 10%;
  transform: rotate(-20deg);
}

.paw-2 {
  top: 15%;
  right: 10%;
  transform: rotate(25deg);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.playing .album-art {
  animation: spin 20s linear infinite;
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>