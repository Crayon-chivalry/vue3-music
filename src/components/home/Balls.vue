<template>
  <div class="balls">
    <div class="balls-item" v-for="item in balls" :key="item.id">
      <img :src="item.iconUrl" />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    balls: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.balls {
  display: flex;
  padding: .625rem 0;
  font-size: .8125rem;
  overflow-x: scroll;
}

.balls-item {
  width: 20%;
  flex-shrink: 0;
  text-align: center;
}

.balls-item img {
  width: 2.1875rem;
  margin-bottom: .125rem;
  background-color: var(--main-color);
  border-radius: 25%;
  overflow: hidden;
}
</style>