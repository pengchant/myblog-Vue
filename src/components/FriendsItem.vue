<template>
  <div class="friendsitem">
    <div class="user_head">
      <router-link to="/">
        <img :src="getuserimgurl(friends.headimgurl)" class="userfaceimg" alt>
      </router-link>
      <router-link :to="blogurl">
        <span class="user_nickname">{{ friends.nickname }}</span>
      </router-link>
    </div>
    <div class="carefriends">
      <!-- 我的关注 -->
      <div v-if="friends.flag==null">
        <el-button type="danger" plain class="care" @click="removeCared">移除</el-button>
      </div>
      <!-- 我的粉丝 -->
      <div v-else>
        <div v-if="friends.flag==0">
          <el-button type="warning" plain class="care" @click="addCared">关注</el-button>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FriendsItem",
  props: {
    friends: {
      userid: "",
      headimgurl: "",
      nickname: "",
      flag: null
    }
  },
  data() {
    return {
      blogurl: "/bloguser?userid="
    };
  },
  computed: {
    ...mapGetters(["getuserimgurl"])
  },
  mounted() {
    this.blogurl = this.blogurl + this.friends.userid;
  },
  methods: {
    addCared() {
      var vm = this; 
      this.$confirm("是否确认关注" + vm.friends.nickname, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 提交给父组件执行关注逻辑
          vm.$parent.$emit("seeaddcare", vm.friends.userid);
        })
        .catch(() => {});
    },
    removeCared(){
      var vm = this;
      this.$confirm("是否确认取消关注" + vm.friends.nickname, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 提交给父组件执行关注逻辑
          vm.$parent.$emit("seeremovecared", vm.friends.userid);
        })
        .catch(() => {});
    }
  }
};
</script>

<style scope>
.friendsitem {
  margin: 0 20px 0 20px;
  height: 70px;
  line-height: 70px;
  border-top: solid 1px rgb(223, 221, 221);
}

.userfaceimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  margin-top: 10px;
  float: left;
}

.user_head {
  display: inline;
}

.carefriends {
  display: block;
  float: right;
}

.user_nickname {
  margin-top: 0px;
  margin-left: 10px;
  float: left;
  color: gray;
}
</style>