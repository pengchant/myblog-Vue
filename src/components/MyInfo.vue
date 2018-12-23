<template>
  <div class="myinfo">
    <div class="myinfotitle">我的个人消息</div>
    <div>
      <el-row>
        <el-col :span="10" style="text-align:center;">
          <a href="#">
            <!-- 用户头像 -->
            <img :src="getuserimgurl() || defaulturl" alt class="head">
          </a>
          <p>
            <el-button type="text" @click="dialogFormVisible = true">修改头像</el-button>
          </p>
        </el-col>
        <el-col :span="14">
          <ul class="self">
            <li class="comon">昵称：{{ userinfo.nickname||"暂无" }}</li>
            <li class="comon">电话：{{ userinfo.phonenum||"暂无"}}</li>
            <li class="comon">email： {{ userinfo.email||"暂无" }}</li>
            <li class="comon">qq：{{ userinfo.qq||"暂无" }}</li>
            <li class="comon">微信：{{ userinfo.weixinid||"暂无" }}</li>
            <li class="comon">微博：{{ userinfo.weiboid||"暂无" }}</li>
            <li class="comon">发文：{{ userinfo.articles||"0" }}篇</li>
            <li class="comon">好友：{{ userinfo.friends||"0" }}位</li>
          </ul>
        </el-col>
      </el-row>
    </div>

    <!-- 上传用户头像 -->
    <el-dialog title="上传头像" :visible.sync="dialogFormVisible">
      <el-form style="text-align:center;">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :action="uploadurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handlePreview"
          :auto-upload="false"
          name="userheaderimg"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { userInfo } from "os";
import comm_config from "@/common/config";

export default {
  name: "MyInfo",
  data() {
    return {
      dialogFormVisible: false,
      imageUrl: "",
      defaulturl: require("../assets/logo.png"),
      uploadurl: "/user/uploadimg/"
    };
  },
  computed: {
    ...mapState(["userinfo"]),
    ...mapGetters(["getuserimgurl"])
  },
  mounted() {
    // 加载用户信息
    this.uploadurl = comm_config.url + this.uploadurl + this.userinfo.userId;
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    // 上传图片成功
    handleAvatarSuccess(res, file) {  
      this.dialogFormVisible = false;
      this.imageUrl = "";
      // 更新本地消息
      this.RECORD_USERINFO(res.data);
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 手动上传
    submitUpload() {
      var vm = this;
      this.$confirm("是否确定上传图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(r => {
        // 提交到服务器
        vm.$refs.upload.submit(); 
        vm.$message.success("图片上传成功!"); 
      }).catch(e=>{
        vm.$message.error("图片未上传");
      })
    },
    // 回显图片在页面上
    handlePreview(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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