<template>
  <div class="user-info" v-if="userinfo">
    <nav-bar title="我的资料" />

    <div class="cell-box">
      <div class="cell">
        <div>头像</div>
        <img class="cell-tx" :src="userinfo.profile.avatarUrl" />
      </div>
      <div class="cell">
        <div>昵称</div>
        <div class="cell-value">{{ userinfo.profile.nickname }}</div>
      </div>
      <div class="cell">
        <div>等级</div>
        <div class="cell-value">lv{{ userinfo.level }}</div>
      </div>
      <div class="cell">
        <div>创建时间</div>
        <div class="cell-value">{{ formatDate(userinfo.createTime) }}</div>
      </div>
      <div class="cell">
        <div>创建天数</div>
        <div class="cell-value">{{ userinfo.createDays }}天</div>
      </div>
    </div>
    
    <div class="sign-out" @click="show = true">退出登录</div>

    <Dialog v-model:show="show" msg="确定要退出登录吗" @confirm="signOut" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Dialog from "@/components/common/dialog/Dialog";

import { onMounted, reactive, toRefs } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { getUserDetail } from "@/network/user";

export default {
  name: "",
  components: {
    NavBar,
    Dialog
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      userinfo: null,
      show: false
    });

    onMounted(() => {
      getdata();
    });

    const getdata = async () => {
      let uid = localStorage.getItem("userid");
      let { data } = await getUserDetail(uid);
      state.userinfo = data;
    };

    function formatDate(t) {
      let time = new Date(t);
      // 取得4位数的年份
      let year = time.getFullYear();
      // 取得日期的月份，其中0表示1月，11表示12月
      let month = addzoer(time.getMonth() + 1);
      // 返回日期月份中的天数
      let date = addzoer(time.getDate());
      // 返回日期中的小时数
      let hour = addzoer(time.getHours());
      // 返回日期中的分钟数(0到59)
      let minute = addzoer(time.getMinutes());
      // 返回日期中的秒数
      let second = addzoer(time.getSeconds());
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
    }

    function addzoer(timE) {
      if (timE < 10) {
        return "0" + timE;
      } else {
        return timE;
      }
    }

    function signOut() {
      store.commit('setLoginStatus', false)
      localStorage.removeItem('userid')
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      router.push('login')
    }

    return {
      ...toRefs(state),
      formatDate,
      signOut
    };
  },
  methods: {},
};
</script>

<style scoped>
.user-info {
  padding-top: 45px;
}

.cell-box {
  margin-top: 10px;
}

.cell {
  padding: 14px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(231, 228, 228, 0.3);
}

.cell:last-child {
  border-bottom: 0;
}

.cell-value {
  color: gray;
}

.cell-tx {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.sign-out {
  margin: 20px;
  padding: 14px 10px;
  border-radius: 6px;
  text-align: center;
  color: #fff;
  background-color: #e02020;
}
</style>