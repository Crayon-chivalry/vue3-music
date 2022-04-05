<template>
  <div class="scroll-block">
    <img :src="imageUrl" />
    <div class="main-title">{{ mainTitle }}</div>
    <div class="sub-title">{{ subTitle }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    mainTitle: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  setup() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.scroll-block {
  width: 28%;
  padding: 0 .3125rem;
  flex-shrink: 0;
}

/* .scroll-block:first-child {
  padding-left: .625rem;
}

.scroll-block:last-child {
  padding-right: .625rem;
} */

.scroll-block img {
  width: 100%;
  border-radius: .625rem;
}

.main-title {
  font-size: .875rem;
  color: #333;
  font-weight: 600;
  margin: .25rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.sub-title {
  font-size: 12px;
  color: gray;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>