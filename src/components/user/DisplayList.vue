<template>
  <div class="list">
    <div class="list-header">
      <div class="list-label">自建歌单</div>
      <div class="list-other">
        查看更多
        <img src="@/assets/img/common/to.svg" />
      </div>
    </div>
    <div class="list-content">
      <div class="item" v-for="(item,index) in 3" :key="index">
        <div class="item-info">
          <img src="https://s1.ax1x.com/2022/04/03/q7T1Vs.png" />
          <div>
            <div class="item-name">默认收藏</div>
            <div class="item-num">30首</div>
          </div>
        </div>
        <div class="item-icon">
          <img src="@/assets/img/user/more2.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  setup() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.list {
  margin: .625rem;
  padding: .625rem;
  background-color: #fff;
  border-radius: .375rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3125rem 0 .9375rem;
}

.list-label {
  font-size: 1.125rem;
  font-weight: 600;
}

.list-other {
  display: flex;
  align-items: center;
  color: gray;
  font-size: .8125rem;
}

.list-other img {
  width: 1rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .625rem;
}

.item-info {
  display: flex;
}

.item-info img {
  width: 4.375rem;
  border-radius: .625rem;
  margin-right: .625rem;
}

.item-name {
  font-weight: 500;
  font-size: .9375rem;
}

.item-num {
  color: gray;
  font-size: .75rem;
  margin-top: .3125rem;
}

.item-icon img {
  width: 1.25rem;
}
</style>