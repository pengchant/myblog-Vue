<template>
  <div class="myinfo">
    <div class="myinfotitle">我的个人消息</div>
    <div>
      <el-row>
        <el-col :span="10" style="text-align:center;">
          <a href="#">
            <img src="https://avatar.csdn.net/4/2/9/1_w3chhhhhh.jpg?1543814186" alt class="head">
          </a>

          <p>
            <el-button type="text" @click="dialogFormVisible = true">修改头像</el-button>
          </p>
        </el-col>
        <el-col :span="14">
          <ul class="self">
            <li class="comon">昵称：男</li>
            <li class="comon">电话：1231314324</li>
            <li class="comon">email： dntchenpeng@163.com</li>
            <li class="comon">qq：计算fdsfs软件</li>
            <li class="comon">微信：111</li>
            <li class="comon">微博：11</li>
            <li class="comon">发文：1篇</li>
            <li class="comon">好友：11位</li>
          </ul>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="上传头像" :visible.sync="dialogFormVisible">
      <el-form style="text-align:center;">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  data() {
    return {
      dialogFormVisible: false,
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
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