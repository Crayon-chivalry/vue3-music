<template>
  <div class="empty">
    <img src="@/assets/img/common/empty.svg" />
    <div class="empty-text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    text: {
      type: String,
      default: "暂无内容"
    }
  },
  setup() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.empty {
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty img {
  width: 35%;
}

.empty-text {
  margin-top: 20px;
  font-size: 15px;
  color: gray;
}
</style>