<template>
  <div class="level">
    <div class="level-header">
      <div class="level-title">{{ title }}</div>
      <div class="level-more">更多</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {}
  },
  methods: {}
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

.content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>