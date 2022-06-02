<template>
  <div class="nav" :class="{'border-b': border}" :style="{backgroundColor: bgColor}">
    <div class="nav-left" @click="toLink">
      <slot name="left">
        <img src="@/assets/img/common/back.svg" />
      </slot>
    </div>
    <div class="nav-center">
      <slot name="center">
        {{ title }}
      </slot>
    </div>
    <div class="nav-right">
      <slot name="right">

      </slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    to: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: true
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "#fff"
    }
  },
  setup(props) {
    const router = useRouter()

    function toLink() { 
      if(props.to) {
        router.push(props.to)
      } else {
        router.back()
      }
    }

    return {
      toLink
    }
  },
  methods: {}
}
</script>

<style scoped>
.nav {
  height: 2.75rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.border-b {
  border-bottom: 1px solid rgba(224, 221, 221, .2);
}

.nav-left, .nav-right {
  width: 2.5rem;
  text-align: center;
}

.nav-center {
  flex: 1;
  text-align: center;
}

.nav-left img,  .nav-right img {
  width: 1.875rem;
}
</style>