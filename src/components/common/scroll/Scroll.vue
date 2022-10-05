<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import { onMounted, ref, watch } from 'vue'

export default {
  name: 'Scroll',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    // 数据
    data: {
      type: Array,
      default: null
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    },
    // 点击列表是否派发 click 事件
    click: {
      type: Boolean,
      default: true
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const wrapper = ref(null)
    let scroll = null

    onMounted(() => {
      scroll = new BScroll(wrapper.value, {
        probeType: props.probeType,
        click: props.click,
        pullUpLoad: true,
        // pullDownRefresh: true
      })

      // 是否派发滚动事件
      if(props.listenScroll) {
        scroll.on('scroll', (pos) => {
          context.emit('scroll', pos)
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if(props.pullup) {
        scroll.on('pullingUp', () => {
          context.emit('pullingUp')
        })
      }

      if(props.pulldown) {
        scroll.on('pullingDown', () => {
          context.emit('pullingDown')
        })
      }
    })

    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    watch(props.data,() => {
      setTimeout(() => {
        refresh()
      }, props.refreshDelay)
    })

    // 代理better-scroll的refresh方法
    function refresh() {
      scroll && scroll.refresh()
    }

    //结束上拉加载行为,然后进行下一次上拉加载的准备
    function finishPullUp() {
      scroll && scroll.finishPullUp()
    }

    return {
      wrapper,
      finishPullUp
    }
  }
}
</script>

<style scoped>
</style>