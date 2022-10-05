<template>
  <div class="dialog-mask" v-if="show">
    <div class="dialog-box">
      <div class="dialog-title">{{ title }}</div>
      <div class="dialog-msg">{{ msg }}</div>
      <div class="dialog-footer">
        <div class="cancel" @click="cancel">取消</div>
        <div class="confirm" @click="confirm">确认</div>
      </div>
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
      default: "提示"
    },
    msg: {
      type: String,
      default: "内容内容"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function cancel() {
      context.emit('update:show', false)
    }

    function confirm() {
      context.emit('update:show', false)
      context.emit('confirm')
    }
    return {
      cancel,
      confirm
    }
  },
  methods: {}
}
</script>

<style scoped>
.dialog-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0, .4);
}

.dialog-box {
  padding: 16px 10px;
  width: 320px;
  border-radius: 16px;
  text-align: center;
  background-color: #fff;
}

.dialog-title {
  font-size: 18px;
}

.dialog-msg {
  padding: 25px 10px;
  color: gray;
}

.dialog-footer {
  padding: 16px 0 0;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(236, 232, 232, .4);
}

.dialog-footer > div {
  flex: 1;
}

.confirm {
  color: red;
}
</style>