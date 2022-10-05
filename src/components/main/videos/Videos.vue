<template>
  <div class="videos">
    <video width="100%" height="100%" class="videos-box" autoplay controls>
      <source :src="url" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  setup() {
    return {}
  },
}
</script>

<style scoped>
.videos {
  position: relative;
  width: 100%;
  height: 210px;
  background-color: #000;
}

.videos-box {
  width: 100%;
  height: 100%;
}
</style>