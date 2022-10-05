<template>
  <div class="search">
    <div class="search-header">
      <img class="back-icon" src="@/assets/img/common/back.svg" @click="back" />
      <div class="search-header-input">
        <img src="@/assets/img/common/search.svg" />
        <input v-model="value" @keyup.enter="search" />
      </div>
      <div class="search-header-btn" @click="search">搜索</div>
    </div>

    <div class="search-record">
      <div class="search-record-header">
        <div>历史</div>
        <img src="@/assets/img/common/delete.svg" @click="remove" />
      </div>
      <div class="record-list">
        <span 
          v-for="(item,index) in searchRecord" 
          :key="index"
          @click="tolink('search-result?value=' + item)"
        >
          {{ item }}
        </span>
      </div>
      <div class="record-list-tips" v-if="searchRecord.length == 0">暂无搜索记录</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: '',
  components: {
  },
  setup() {
    const $Toast = inject('Toast')
    const router = useRouter()
    const state = reactive({
      value: "",
      searchRecord: [],
      list: []
    })
    // 获取缓存
    let searchRecord = JSON.parse(localStorage.getItem('searchRecord'))
    state.searchRecord = searchRecord ? searchRecord : []

    function back() {
      router.back()
    }

    function tolink(path) {
      router.push(path)
    }

    const search = async () => {
      if(!state.value || state.value == '') {
        $Toast({message: "关键词不能为空"})
        return
      }
      let find = state.searchRecord.find(item => {
        return item == state.value
      })
      if(!find) {
        state.searchRecord.unshift(state.value)
        if(state.searchRecord.length > 8) {
          state.searchRecord.pop()
        }
        localStorage.setItem('searchRecord',JSON.stringify(state.searchRecord))
        router.push({
          name: 'search-result',
          query: {
            value: state.value
          }
        })
      }
    }

    function remove() {
      state.searchRecord = []
      localStorage.setItem('searchRecord',JSON.stringify(state.searchRecord))
    }

    return {
      ...toRefs(state),
      search,
      back,
      remove,
      tolink
    }
  },
  methods: {}
}
</script>

<style scoped>
.search-header {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
}

.back-icon {
  margin-right: 6px;
  width: 30px;
}

.search-header-input {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 20px 0px 10px;
  border-radius: 99rem;
  background-color: #f7f8fa;
}

.search-header-input input {
  width: 100%;
  height: 30px;
  border: 0;
  background-color: transparent;
  outline: none;
}

.search-header-input img {
  width: 20px;
  padding-right: 6px;
}

.search-header-btn {
  margin-left: 10px;
  color: var(--main-color);
}

.search-record {
  padding: 10px;
}

.search-record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
}

.search-record-header img {
  width: 20px;
}

.record-list span {
  display: inline-block;
  margin: 14px 10px 0 0;
  padding: 4px 16px;
  font-size: 14px;
  border-radius: 99rem;
  background-color: rgba(215, 210, 210, 0.4);
}

.search-list {
  margin: 10px;
  border-radius: 8px;
  background-color: #fff;
}

.search-list-title {
  padding: 14px 10px 10px;
  font-weight: 600;
}

.search-item {
  font-size: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(223, 217, 217, 0.4);
}

.search-item:last-child {
  border-bottom: 0;
}

.search-item img {
  width: 25px;
}

.search-item-label {
  margin-top: 4px;
  color: gray;
  font-size: 13px;
}

.record-list-tips {
  margin-top: 14px;
  font-size: 14px;
  text-align: center;
  color: gray;
}
</style>