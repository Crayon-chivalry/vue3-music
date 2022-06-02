<template>
  <div v-if="banners.length > 0" class="swiper-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="swiper-item">
      <div v-for="(item, index) in banners" :key="index" class="slide">
        <img :src="item.pic" alt="" />
      </div>
    </div>

    <div class="points-box">
      <div class="points">
        <div 
          class="each-point" 
          v-for="(item, index) in banners.length" 
          :key="index"
          :class="{'current': index == currenIndex}"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: '',
  components: {},
  props: {
    // 轮播图数据
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup (props) {
    const bannerWidth = ref(0)   // 轮播图宽度
    const startPoint = ref(0)    // 触摸开始的点的横坐标
    const endPoint = ref(0)      // 触摸结束的点的横坐标
    const moveLength = ref(0)    // StartPoint 与 EndPoint 的差值
    const currenIndex = ref(0)     // 当前轮播图的索引
    const isPlaying = ref(true)  // 判断是否处于自动轮播
    const playTimer = ref(null)  // 轮播定时器

    // 开启轮播
    function startPlay() {
      clearInterval(playTimer.value)
      playTimer.value = setInterval(() => {
        if(currenIndex.value == props.banners.length - 1) {
          currenIndex.value = -1
        }
        currenIndex.value++
        // 获取 slide 元素标签
        let currentimg = document.getElementsByClassName('slide')
        bannerWidth.value = currentimg[0].offsetWidth
        currentimg[0].style.marginLeft = -currenIndex.value * bannerWidth.value + 'px'
        currentimg[0].style.transition = 'all 1s ease'
      }, 3000)
    }

    // 手指放到屏幕上触发
    function touchStart(event) {
      // 停止轮播
      clearInterval(playTimer.value)
      // 获取触摸的开始点
      startPoint.value = event.changedTouches[0].pageX
    }

    // 手指在屏幕移动触发（高频）
    function touchMove(event) {
      // 获取触发的结束点
      endPoint.value = event.changedTouches[0].pageX
      slidings()
    }

    // 手指离开屏幕触发
    function touchEnd() {
      jump()
      startPlay()
    }

    // 用于处理滑动过程中，轮播图跟着手指滑动的距离移动
    function slidings() {
      // 判断是点击还是滑动
      if(startPoint.value == endPoint.value) { return }
      let currentimg = document.getElementsByClassName('slide')
      moveLength.value = startPoint.value - endPoint.value
      // 判断是否超出滑动范围，即第一页无法再往前一页滑动，最后一页无法往后滑动
      if(moveLength.value > 0 && currenIndex.value !== props.banners.length - 1) {
        currentimg[0].style.marginLeft = -moveLength.value - currenIndex.value * bannerWidth.value + 'px'
        currentimg[0].style.transition = ''
      }
      else if(moveLength.value < 0 && currenIndex.value !== 0) {
        currentimg[0].style.marginLeft = -moveLength.value - currenIndex.value * bannerWidth.value + 'px'
        currentimg[0].style.transition = ''
      }
    }

    // 处理滑动到一定程度后松手自动跳转下一页或者上一页
    function jump() {
      let currentimg = document.getElementsByClassName('slide')
      currentimg[0].style.transition = 'all 1s ease'
      // 滑动超过轮播图宽度的百分之40，则跳转下一张，否则不跳转
      if(moveLength.value > 0 && currenIndex.value !== props.banners.length - 1) {
        if(moveLength.value > bannerWidth.value * 0.25) {
          currenIndex.value++
          currentimg[0].style.marginLeft = -currenIndex.value * bannerWidth.value + 'px'
        }
        else{
          currentimg[0].style.marginLeft = -currenIndex.value * bannerWidth.value + 'px'
        }
      }
      else if(moveLength.value < 0 && currenIndex.value !== 0) {
        if(-moveLength.value > bannerWidth.value * 0.25) {
          currenIndex.value--
          currentimg[0].style.marginLeft = -currenIndex.value * bannerWidth.value + 'px'
        }
        else{
          currentimg[0].style.marginLeft = -currenIndex.value * bannerWidth.value + 'px'
        }
      }
    }

    onMounted(() => {
      startPlay()
    })

    onUnmounted(() => {
      clearInterval(playTimer.value)
    })

    return {
      bannerWidth,
      startPoint,
      endPoint,
      moveLength,
      currenIndex,
      isPlaying,
      playTimer,
      touchStart,
      touchMove,
      touchEnd
    }
  },
  methods: {}
}
</script>

<style scoped>
.swiper-box {
  position: relative;
  overflow: hidden;
}

.swiper-item {
  display: flex;
}

.slide {
  /* 父元素宽度不够用时，不缩小适应 */
  flex-shrink: 0;
  width: 100%;
}

.swiper-item img {
  width: 100%;
  height: 100%;
}

.points-box {
  display: flex;
  justify-content: center;
}

.points {
  display: flex;
  position: absolute;
  bottom: .5rem;
  justify-content: space-evenly;
}

.points .each-point {
  width: .5rem;
  height: .5rem;
  margin: 0 2px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.7;
}

.points .current {
  background-color: #ff0031;
}
</style>