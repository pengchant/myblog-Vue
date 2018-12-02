<template>
  <div class="myfriends">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="我的粉丝">
          <FriendsItem  v-for="friend in friends" :key="friend.id" :friends="friend" />
      </el-tab-pane>
      <el-tab-pane label="我的关注">我的关注</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FriendsItem from '@/components/FriendsItem';

export default {
  name: "MyFriends",
  data() {
    return {
      tabPosition: "left",
      friends: [
        {
          id: "1",
          userface: "qq_123232",
          nickname: "小鹏要逆袭"
        },
        {
          id: "2",
          userface: "qq_123232",
          nickname: "小鹏要逆袭"
        }
      ]
    };
  },
  components: {
      FriendsItem
  }
};
</script>

<style scope>
.myfriends {
  margin-top: 20px;
}
</style>