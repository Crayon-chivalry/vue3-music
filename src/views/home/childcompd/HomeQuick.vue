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
    <div class="balls-item" @click="tolink('ranking-list')">
      <img src="@/assets/img/quick/ranking-list.svg" />
      <div>排行榜</div>
    </div>
    <div class="balls-item" @click="tolink('album')">
      <img src="@/assets/img/quick/album.svg" />
      <div>数字专辑</div>
    </div>
    <div class="balls-item" @click="tolink('Singer')">
      <img src="@/assets/img/quick/singer.svg" />
      <div>歌手</div>
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
  justify-content: space-around;
  padding: 1rem 0;
  font-size: .8125rem;
   /* firefox */
  /* scrollbar-width: none; */
  /* IE 10+ */
  /* -ms-overflow-style: none;  */
  /* overflow-x: auto; */
  /* overflow-y: hidden; */
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