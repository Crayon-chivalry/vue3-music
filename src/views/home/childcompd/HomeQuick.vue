<template>
  <div class="balls">
    <div class="balls-item" @click="tolink('recommend')">
      <img src="@/assets/img/quick/recommend.svg" />
      <div>每日推荐</div>
    </div>
    <div class="balls-item" @click="tolink('song-sheet')">
      <img src="@/assets/img/quick/song-sheet.svg" />
      <div>歌单</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Quick',
  components: {},
  setup() {
    const router = useRouter()

    function tolink(path) {
      router.push(path)
    }

    return {
      tolink
    }
  },
  methods: {}
}
</script>

<style scoped>
.balls {
  display: flex;
  padding: 1rem 0;
  font-size: .8125rem;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: auto;
  overflow-y: hidden;
}

.balls::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.balls-item {
  width: 18.5%;
  flex-shrink: 0;
  text-align: center;
}

.balls-item img {
  width: 2.1875rem;
  margin-bottom: .125rem;
  background-color: var(--main-color);
  border-radius: 25%;
  overflow: hidden;
}
</style>