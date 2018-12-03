<template>
  <div class="friendsitem">
    <div class="user_head">
      <router-link to="/">
        <img :src="friends.userface" class="userfaceimg" alt>
      </router-link>
      <router-link to="/">
        <span class="user_nickname">{{ friends.nickname }}</span>
      </router-link>
    </div>
    <div class="carefriends">
      <el-button type="danger" plain class="care">关注</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendsItem",
  props: {
    friends: {
      id: "",
      userface: "",
      nickname: ""
    }
  },
  data() {
    return {};
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