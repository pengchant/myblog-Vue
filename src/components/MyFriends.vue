<template>
  <div class="myfriends">
    <el-tabs :tab-position="tabPosition" >
      <el-tab-pane label="我的粉丝" >
        <!-- Headline -->
        <div class="headline">
          <span class="myfans">我的粉丝</span>
          <span class="total">共10人</span>
        </div> 
        <!--用户列表 -->
        <FriendsItem v-for="friend in friends" :key="friend.id" :friends="friend"/> 
      </el-tab-pane>
      <el-tab-pane label="我的关注">
        <!-- Headline -->
        <div class="headline">
          <span class="myfans">我的关注</span>
          <span class="total">共50人</span>
        </div> 
        <!--用户列表 -->
        <FriendsItem v-for="friend in friends" :key="friend.id" :friends="friend"/> 
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FriendsItem from "@/components/FriendsItem";

export default {
  name: "MyFriends",
  data() {
    return {
      tabPosition: "left",
      friends: [
        {
          id: "1",
          userface: "",
          nickname: "小鹏要逆袭"
        },
        {
          id: "2",
          userface: "",
          nickname: "小鹏要逆袭"
        },
        {
          id: "3",
          userface: "",
          nickname: "南京大学"
        },
        {
          id: "4",
          userface: "",
          nickname: "南京航空航天大学"
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

.myfans {
  float: left;
  font-weight: 800;
  font-size: 20px;
}

.total {
  float: right;
}

.headline {
  margin: 0px 20px 20px 20px;
  line-height: 20px;
  height: 20px;
}
 
</style>