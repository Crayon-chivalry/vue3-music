<template>
  <div class="tabs">
    <div class="tabs-wrap" ref="tabsWrap">
      <div class="tabs-nav" ref="tabsNav">
        <div 
          class="tab" 
          :class="{'tab-active': active == index}" 
          v-for="(item,index) in tabs" 
          :key="index"
          @click="change(index, $event)"
        >
          {{ item.name }}
        </div>
        <div class="tabs-line" :style="{'transform':tabTransform + 'translateX(-50%)'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: '',
  components: {},
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props, context) {
    const tabsWrap = ref(null)
    const tabsNav = ref(null)
    const tabTransform = ref("")

    onMounted(() => {
      let tab = document.getElementsByClassName('tab')
      tabTransform.value = 'translateX(' + (tab[0].offsetWidth / 2) + 'px)'
    })

    function change(index, e) {
      // 子传父
      context.emit("update:active", index)
      // 屏幕宽度
      let winWidth  = tabsWrap.value.clientWidth
      // 标签栏宽度
      let tabsNavWidth = tabsNav.value.offsetWidth
      // 元素
      let tabEl = e.target
      if(tabEl) {
        let tabLeft = tabEl.offsetLeft, // 元素左偏移
          tabWidth = tabEl.offsetWidth, // 元素宽度
          tabCenter = (winWidth - tabWidth) / 2,  // 中间值(当前屏幕的宽度 - 元素的宽度) /2
          tabTarget = tabLeft - tabCenter // 目标值 
          // 暂不理解  中间值 、 目标值
        // 改变激活标签下划线的位置
        tabTransform.value = 'translateX(' + (tabLeft + (tabWidth / 2)) + 'px)'
        if(tabTarget < 0) {
          tabsNav.value.scrollLeft = 0
          return
        }
        if(tabTarget < (winWidth - tabsNavWidth)) {
          tabsNav.value.scrollLeft = -(winWidth - tabsNavWidth)
          return
        }
        tabsNav.value.scrollLeft = tabTarget
      }
    }

    return {
      tabsNav,
      tabsWrap,
      tabTransform,
      change
    }
  }
}
</script>

<style scoped>
/* .tabs {
  padding: 0 0 15px;
} */

.tabs-wrap {
  padding: 0 8px;
  position: relative;
  height: 44px;
  overflow: hidden;
  background-color: #fff;
}

.tabs-nav {
  position: relative;
  box-sizing: content-box;
  padding-bottom: 15px;
  height: 100%;
  display: flex;
  overflow-x: auto;
  align-items: center;
  /* 平滑滚动 */
  transition: all 0.5s linear;
  scroll-behavior: smooth;
  scrollbar-width: none; 
}

.tab {
  position: relative;
  flex: 1 0 auto;
  padding: 0 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #646566;
}

.tab-active {
  color: #323233;
}

.tabs-line {
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 40px;
  height: 3px;
  border-radius: 3px;
  background-color: #456aff;
  transition-duration: 0.3s
}
</style>