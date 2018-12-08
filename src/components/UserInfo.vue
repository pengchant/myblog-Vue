<template>
  <div class="userinfo">
    <el-card style="padding-bottom:30px;">
      <el-container>
        <el-main style="text-align:center;">
          <a href="#">
            <img
              :src="faceurl"
              alt
              class="head_img"
            >
          </a>
        </el-main>
        <el-footer>
          <el-row style="text-align:center;margin-bottom:10px;">
            <router-link to="/" style="text-decoration:none; ">{{ nickname }}</router-link>
          </el-row>
          <ul class="list_info">
            <li>
              <router-link to="/myarticle">
                <el-tag type="success" style="margin-left: -10px;">
                  <span
                    class
                  >发文&nbsp; {{  articles }}</span>
                </el-tag>
              </router-link>
            </li>
            <li>
              <router-link to="/friends">
                <el-tag type="danger">
                  <span
                    class
                  >人脉&nbsp; {{ friends }}</span>
                </el-tag>
              </router-link>
            </li>
          </ul>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserInfo",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userinfo"]),
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
  background-size:100%;
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