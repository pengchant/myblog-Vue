<template>
  <div class="myfriends">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="我的粉丝" @seeaddcare="handleAddCared">
        <!-- Headline -->
        <div class="headline">
          <span class="myfans">我的粉丝</span>
          <span class="total">共{{ totalfans }}人</span>
        </div>
        <!--用户列表 -->
        <FriendsItem v-for="friend in myfans" :key="friend.userid" :friends="friend"/>
      </el-tab-pane>

      <el-tab-pane label="我的关注" @seeremovecared="handleRemove">
        <!-- Headline -->
        <div class="headline">
          <span class="myfans">我的关注</span>
          <span class="total">共{{ totalfriends }}人</span>
        </div>
        <!--用户列表 -->
        <FriendsItem v-for="friend in friends" :key="friend.userid" :friends="friend"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FriendsItem from "@/components/FriendsItem";
import { mapState, mapMutations } from "vuex";

export default {
  name: "MyFriends",
  data() {
    return {
      tabPosition: "left",
      friends: [],
      totalfriends: "0",
      myfans: [],
      totalfans: "0"
    };
  },
  components: {
    FriendsItem
  },
  computed: {
    ...mapState(["userinfo"])
  },
  mounted() {
    // 加载数据
    this.initData();
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    initData() {
      // 查询所有粉丝
      this.$api.queryMyFans(this.userinfo.userId).then(r => {
        // 绑定数据
        this.myfans = r.data.data;
        this.totalfans = this.myfans.length;
      });

      // 查询所有朋友
      this.$api.queryMyFriends(this.userinfo.userId).then(r => {
        // 绑定数据
        this.friends = r.data.data;
        this.totalfriends = this.friends.length;
      });
    },
    handleAddCared(blogid) {
      // 添加
      this.$api
        .addFriends({
          myid: this.userinfo.userId,
          blgid: blogid
        })
        .then(r => { 
          this.$message.success("添加成功");
          // 重新初始化数据
          this.initData();
          // 重新更新数据
          this.RECORD_USERINFO(r.data.data);
        });
    },
    handleRemove(blgid) {
      // 移除
      this.$api
        .cancelCared({
          myid: this.userinfo.userId,
          blgid: blgid
        })
        .then(r => { 
          if (r.data.ok) {
            this.$message.success("移除成功");
            // 重新初始化数据
            this.initData();
            // 重新更新数据
            this.RECORD_USERINFO(r.data.data);
          }
        });
    }
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