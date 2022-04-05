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
  padding: 1rem 0;
  font-size: .8125rem;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: auto;
  overflow-y: hidden;
}

.balls::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.balls-item {
  width: 18.5%;
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