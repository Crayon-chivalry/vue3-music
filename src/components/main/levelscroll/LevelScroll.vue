<template>
  <div class="level">
    <div class="level-header">
      <div class="level-title">{{ title }}</div>
      <div class="level-more">更多</div>
    </div>
    <div class="content" v-if="!swiper">
      <slot></slot>
    </div>
    <div class="content swiper" v-if="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    // 是否与轮播方式滑动
    swiper: {
      type: Boolean,
      default: false
    },
    // 要获取元素的 class
    eleClass: {
      type: String,
      default: ""
    },
    // 数据长度
    length: {
      type: Number,
      default: 0
    },
    // 滚动偏差
    offset: {
      type: Number,
      default: 25
    }
  },
  setup(props) {
    const bannerWidth = ref(0)   // 元素宽度
    const startPoint = ref(0)    // 触摸开始的点的横坐标
    const endPoint = ref(0)      // 触摸结束的点的横坐标
    const moveLength = ref(0)    // StartPoint 与 EndPoint 的差值
    const currenIndex = ref(0)     // 当前索引

    // 手指放到屏幕上触发
    function touchStart(event) {
      // 获取触摸的开始点
      startPoint.value = event.changedTouches[0].pageX
    }

    // 手指在屏幕移动触发（高频）
    function touchMove(event) {
      // 获取触发的结束点
      endPoint.value = event.changedTouches[0].pageX
      slidings()
    }

    // 用于处理滑动过程中，轮播图跟着手指滑动的距离移动
    function slidings() {
      // 判断是点击还是滑动
      if(startPoint.value == endPoint.value) { return }
      let currentimg = document.getElementsByClassName(props.eleClass)
      bannerWidth.value = currentimg[0].offsetWidth - props.offset
      moveLength.value = startPoint.value - endPoint.value
      // 判断是否超出滑动范围，即第一页无法再往前一页滑动，最后一页无法往后滑动
      if(moveLength.value > 0 && currenIndex.value !== props.length - 1) {
        currentimg[0].style.marginLeft = -moveLength.value - currenIndex.value * bannerWidth.value + 'px'
        currentimg[0].style.transition = ''
      }
      else if(moveLength.value < 0 && currenIndex.value !== 0) {
        currentimg[0].style.marginLeft = -moveLength.value - currenIndex.value * bannerWidth.value + 'px'
        currentimg[0].style.transition = ''
      }
    }

    // 手指离开屏幕触发,处理滑动到一定程度后松手自动跳转下一页或者上一页
    function touchEnd() {
      let currentimg = document.getElementsByClassName(props.eleClass)
      currentimg[0].style.transition = 'all 1s ease'
      // 滑动超过轮播图宽度的百分之40，则跳转下一张，否则不跳转
      if(moveLength.value > 0 && currenIndex.value !== props.length - 1) {
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
    return {
      touchStart,
      touchMove,
      touchEnd
    }
  }
}
</script>

<style scoped>
.level {
  padding: .625rem 0;
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .625rem;
}

.level-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.level-more {
  font-size: .875rem;
  color: gray;
}

.content {
  padding: .625rem .3125rem;
  display: flex;
  align-items: center;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: auto;
  overflow-y: hidden;
}

.swiper {
  overflow-x: hidden !important;
}

.content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>