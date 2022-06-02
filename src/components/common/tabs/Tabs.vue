<template>
  <div class="tabs-wrap">
    <div 
      class="tabs-item" 
      v-for="(item, index) in tabs" 
      :key="index"
    >
      <div @click="change(index)">
        {{ item.name }}
        <div class="tabs-item-border" :class="{'tabs-item-border-active': active == index}" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  components: {},
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    function change(index) {
      if(props.active != index) {
        context.emit('update:active', index)
      }
    }

    return {
      change
    }
  },
}
</script>

<style scoped>
.tabs-wrap{
  display: flex;
  align-items: center;
  padding: 13px 10px 7px;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: auto;
  overflow-y: hidden;
}

.tabs-wrap::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.tabs-item {
  flex-shrink: 0;
  padding: 0 16px;
  text-align: center;
  font-size: 15px;
}

.tabs-item > div {
  display: inline-block;
}

.tabs-item-border {
  margin-top: 6px;
  width: 100%;
  height: 3px;
  background-color: transparent;
  border-radius: 99rem;
}

.tabs-item-border-active {
  background-color: var(--main-color);
}
</style>