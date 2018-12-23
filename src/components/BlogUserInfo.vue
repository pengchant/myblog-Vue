<template>
  <div class="myinfo">
    <div class="myinfotitle">{{currentuser.nickname}}个人信息</div>
    <div>
      <el-row>
        <el-col :span="10" style="text-align:center;">
          <a href="#">
            <!-- 用户头像 -->
            <img :src="getuserimgurl(currentuser.headimgurl) || defaulturl" alt class="head">
          </a>
          <el-row style="margin-top:50px;">
            <div v-if="hascared">
              <el-button type="danger" @click="cancelCared">取消关注</el-button>
            </div>
            <div v-else>
              <el-button type="success" @click="cared">关注</el-button>
            </div>
          </el-row>
        </el-col>
        <el-col :span="14">
          <!-- 消息部分 -->
          <ul class="self">
            <li class="comon">昵称：{{ currentuser.nickname||"暂无" }}</li>
            <li class="comon">电话：{{ currentuser.phonenum||"暂无"}}</li>
            <li class="comon">email： {{ currentuser.email||"暂无" }}</li>
            <li class="comon">qq：{{ currentuser.qq||"暂无" }}</li>
            <li class="comon">微信：{{ currentuser.weixinid||"暂无" }}</li>
            <li class="comon">微博：{{ currentuser.weiboid||"暂无" }}</li>
            <li class="comon">发文：{{ currentuser.articles||"0" }}篇</li>
            <li class="comon">好友：{{ currentuser.friends||"0" }}位</li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { userInfo } from "os";
import comm_config from "@/common/config";

export default {
  name: "BlogUserInfo",
  data() {
    return {
      currentuser: {},
      defaulturl: require("../assets/logo.png"),
      hascared: false
    };
  },
  computed: {
    ...mapState(["userinfo"]),
    ...mapGetters(["getuserimgurl"])
  },
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    initData() {
      let userid = this.$route.query.userid;
      let vm = this;
      // 查询个人信息
      this.$api.queryUserInfo(userid).then(r => {
        vm.currentuser = r.data.data;
        // 查询是否被关注
        vm.$api
          .hasCared({
            myid: vm.userinfo.userId,
            blgid: vm.currentuser.userId
          })
          .then(r => {
            vm.hascared = r.data.data;
          });
      });
    },
    cancelCared() {
      let vm = this;
      // 取消关注
      this.$confirm("是否确认取消关注" + this.currentuser.nickname, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 添加
          vm.$api
            .cancelCared({
              myid: this.userinfo.userId,
              blgid: this.currentuser.userId
            })
            .then(r => {
              this.$message.success("取消关注成功");
              // 重新初始化数据
              vm.initData();
              // 更新本地用户信息
              vm.RECORD_USERINFO(r.data.data);
            });
        })
        .catch(() => {});
    },
    cared() {
      let vm = this;
      // 关注
      this.$confirm("是否确认关注" + this.currentuser.nickname, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(r => {
          // 移除
          this.$api
            .addFriends({
              myid: this.userinfo.userId,
              blgid: this.currentuser.userId
            })
            .then(r => {
              if (r.data.ok) {
                this.$message.success("关注成功");
                // 重新初始化数据
                vm.initData();
                // 更新本地用户信息
                vm.RECORD_USERINFO(r.data.data);
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scope>
.myinfotitle {
  height: 50px;
  line-height: 50px;
  font-weight: 800;
  font-size: 20px;
  margin-right: 20px;
  margin-left: 20px;
  border-bottom: solid 1px rgb(224, 222, 222);
}

.head {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 16px;
}

.self {
  list-style: none;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
  margin-top: 17px;
}

.comon {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #4d4d4d;
}

/*上传样式*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>