<template>
  <div class="toast">
    <img src="@/assets/img/toast/fail.svg" width="50" />
    <div class="toast-msg">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    type: {
      type: String,
      default: 'fail'
    },
    message: {
      type: String,
      default: "提示"
    }
  },
  setup() {
    return {}
  },
}
</script>

<style scoped>
.toast {
  width: 140px;
  height: 140px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, .6);
}

.toast-msg {
  margin-top: 10px;
}
</style>