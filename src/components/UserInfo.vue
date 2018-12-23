<template>
  <div class="userinfo">
    <el-card style="padding-bottom:30px;">
      <el-container>
        <el-main style="text-align:center;">
          <a href="#">
            <img :src="getuserimgurl()" alt class="head_img">
          </a>
        </el-main>
        <el-footer>
          <el-row style="text-align:center;margin-bottom:10px;">
            <a style="cursor:pointer;" @click="handleinfo">{{ nickname }}</a>
          </el-row>
          <ul class="list_info">
            <li>
              <a style="cursor:pointer;" @click="handlearticle">
                <el-tag type="success" style="margin-left: -10px;">
                  <span class>发文&nbsp; {{ articles }}</span>
                </el-tag>
              </a>
            </li>
            <li>
              <a style="cursor:pointer;" @click="handlefriends">
                <el-tag type="danger">
                  <span class>人脉&nbsp; {{ friends }}</span>
                </el-tag>
              </a>
            </li>
          </ul>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "UserInfo",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userinfo"]),
    ...mapGetters(["getuserimgurl"]),
    faceurl: function() {
      let img_url = require("../assets/logo.png");
      if (this.userinfo != null) {
        img_url = this.userinfo.headimgurl || img_url;
      }
      return img_url;
    },
    nickname: function() {
      let nick_name = "youke";
      if (this.userinfo != null) {
        nick_name = this.userinfo.nickname || nick_name;
      }
      return nick_name;
    },
    friends: function() {
      let friend_num = "0";
      if (this.userinfo != null) {
        friend_num = this.userinfo.friends || friend_num;
      }
      return friend_num;
    },
    articles: function() {
      let art_num = "0";
      if (this.userinfo != null) {
        art_num = this.userinfo.articles || art_num;
      }
      return art_num;
    }
  },
  methods: {
    ...mapMutations(["SET_ACTIVEINDEX"]),
    handlearticle() {
      if (this.userinfo !== null) {
        this.$router.push("/myarticle");
        this.SET_ACTIVEINDEX("2");
      } else {
        this.$message.error("请登录");
      }
    },
    handlefriends() {
      if (this.userinfo !== null) {
        this.$router.push("/friends");
        this.SET_ACTIVEINDEX("4");
      } else {
        this.$message.error("请登录");
      }
    },
    handleinfo() {
      if (this.userinfo !== null) {
        this.$router.push("/myinfo");
        this.SET_ACTIVEINDEX("3");
      } else {
        this.$message.error("请登录");
      }
    }
  }
};
</script>

<style scope>
.head_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 16px;
  background-size: 100%;
}

.userinfo {
  margin-top: 20px;
  margin-right: 20px;
}

.list_info {
  list-style: none;
  font-size: 15px;
  text-align: center;
  display: inline;
  top: 20px;
}

.list_info > li {
  display: inline-block;
}
</style>