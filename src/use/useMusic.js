import { reactive, ref } from 'vue'

// 元素
const audioRef = ref(null)
// 播放状态
const playState = ref(false)
// 播放信息
const musicData = reactive({
  id: "",
  picUrl: "",
  name: "",
  singer: "",
  url: "",
  show: false
})


export default function useMusicFunction() {

  // 存取音乐信息,并自动播放音乐
  function setMusicData(data) {
    musicData.id = data.id
    musicData.picUrl = data.picUrl
    musicData.name = data.name
    musicData.singer = data.singer
    musicData.url = data.url
    musicData.show = data.show
    audioRef.value.load()
    play()
  }

  // 播放音乐
  function play() {
    playState.value = true
    audioRef.value.play()
  }

  // 暂停播放
  function pause() {
    playState.value = false
    audioRef.value.pause()
  }

  // 播放结束触发
  function ended() {
    playState.value = false
  }

  // 显示隐藏播放器
  function isShow(state) {
    if(musicData.url) {
      musicData.show = state
    } else {
      musicData.show = false
    }
  }

  return {
    audioRef,
    playState,
    musicData,
    play,
    pause,
    ended,
    setMusicData,
    isShow
  }
}