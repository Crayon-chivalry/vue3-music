<template>
  <div class="videos">
    <video width="100%" height="100%" class="videos-box" autoplay>
      <source src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2191662823/4e02e62a4d77bcb50e7d53afb95fa0cd.mp4?wsSecret=cd1e4f72651fd32e813d8d272070d76e&wsTime=1651483622" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  setup() {
    return {}
  },
}
</script>

<style scoped>
.videos {
  min-height: calc(100vh - 50px);
  background-color: #000;
}

.videos-box {
  position: absolute;
  left: 0;
  bottom: 50px;
  width: 100%;
  height: 100%;
}
</style>