<template>
  <div class="userinfo">
    <el-card style="padding-bottom:30px;">
      <el-container>
        <el-main style="text-align:center;">
          <a href="#">
            <img
              src="https://avatar.csdn.net/4/2/9/1_w3chhhhhh.jpg?1543729025"
              alt
              class="head_img"
            >
          </a>
        </el-main>
        <el-footer>
          <el-row style="text-align:center;margin-bottom:10px;">
            <a href="#" style="text-decoration:none; ">小鹏要逆袭</a>
          </el-row>
          <ul class="list_info">
            <li>
              <a href="#">
                <el-tag type="success" style="margin-left: -10px;">
                  <span class>发文&nbsp; 111</span>
                </el-tag>
              </a>
            </li>
            <li>
              <a href="#">
                <el-tag type="danger">
                  <span class>人脉&nbsp; 120</span>
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
export default {
  name: "UserInfo",
  data() {
    return {};
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