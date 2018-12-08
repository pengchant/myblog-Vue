<template>
  <div class="my_banner">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">我的博客</el-menu-item>
      <el-menu-item index="6">新建博客</el-menu-item>
      <el-menu-item index="4">我的圈子</el-menu-item>
      <el-menu-item index="3">个人信息</el-menu-item>

      <el-submenu v-if="islogined" index="5" style="float:right;">
        <template slot="title">你好, {{ userinfo.nickname }}</template>
        <el-menu-item index="5-1">退出登录</el-menu-item>
        <el-menu-item index="5-2">修改密码</el-menu-item>
        <el-menu-item index="5-3">个人信息</el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else
        index="5"
        @click="dialogVisible=true;islogin=true;"
        style="float:right;"
      >你好,请登录!</el-menu-item>
    </el-menu>

    <!-- 登录/注册 -->
    <el-dialog title="登录/注册" :visible.sync="dialogVisible" width="40%">
      <section v-if="islogin">
        <!-- 登录开始 -->
        <el-form
          ref="logininfo"
          :model="logininfo"
          label-width="80px"
          :rules="rules1"
          key="logininfo"
        >
          <el-form-item label="用户名" prop="account">
            <el-input v-model="logininfo.account" clearable placeholder="输入昵称/手机号/邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="logininfo.pwd" type="password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
          <span class="newaccspan" @click="islogin=false;">没有账号?注册一个吧</span>
          <el-form-item>
            <el-button type="primary" @click="submitForm('logininfo')">登录</el-button>
            <el-button @click="resetForm('logininfo')">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 登录结束 -->
      </section>

      <section v-else>
        <!-- 注册开始 -->
        <el-form
          ref="registinfo"
          :model="registinfo"
          label-width="80px"
          :rules="rules2"
          key="registinfo"
          status-icon
        >
          <el-form-item label="用户名" prop="nickname">
            <el-input v-model="registinfo.nickname" clearable placeholder="输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-col :span="15">
              <el-input v-model="registinfo.email" clearable placeholder="请输入邮箱"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="warning"
                style="float:right;"
                @click="handlevalibtn"
                :disabled="isValiDisabled"
              >{{ btnvalitext }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="验证码" prop="validatecode">
            <el-input clearable v-model="registinfo.validatecode" placeholder="输入验证码"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registinfo.password" placeholder="输入密码" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmpass">
            <el-input
              v-model="registinfo.confirmpass"
              placeholder="重新输入密码"
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registinfo')">创建账号</el-button>
            <el-button type="success" @click="islogin=true;">返回登录</el-button>
          </el-form-item>
        </el-form>
        <!-- 注册结束 -->
      </section>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { userInfo } from "os";
import crypto from 'crypto';

export default {
  name: "Banner",
  data() {
    // 自定义验证规则：
    // 验证用户名
    var valiNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        // 验证是否有重复名称
        this.$api
          .validateUser({
            searchstr: this.registinfo.nickname
          })
          .then(r => {
            if (r.data.ok) {
              callback();
            } else {
              callback(new Error(r.data.msg));
            }
          });
      }
    };
    // 验证邮箱
    var valiEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("对不起邮箱不能为空"));
      } else {
        var reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
        );
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          // 验证是否有重复名称
          this.$api
            .validateUser({
              searchstr: this.registinfo.email
            })
            .then(r => {
              if (r.data.ok) {
                // 设置可以重新发送邮箱
                this.btnvalitext = "发送验证码";
                this.isValiDisabled = false;
                callback();
              } else {
                callback(new Error("对不起该邮箱已经被注册"));
              }
            });
        }
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if(value!=undefined&&(value.length<6||value.length>20)){
          callback(new Error("对不起密码长度在6~20之间"));
        }
        if (this.registinfo.confirmpass !== "") {
          this.$refs.registinfo.validateField("confirmpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registinfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else { 
        callback();
      }
    };

    return {
      activeIndex: "1", // 激活
      input_search: "", // 输入框
      dialogVisible: false, // 登录/注册框显示隐藏
      islogin: true, // 是否为登录
      isValiDisabled: true, // 是否禁用
      btnvalitext: "发送验证码", // 发送验证码标签
      timer: 60, // 倒计时
      logininfo: {
        // 登录表单信息
        account: "",
        pwd: ""
      },
      registinfo: {
        // 注册表单信息
        nickname: "",
        email: "",
        validatecode: "",
        password: "",
        confirmpass: ""
      },
      rules1: {
        // 登录框验证表单
        account: [
          {
            required: true,
            message: "请输入账号/手机/邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      rules2: {
        // 注册表单验证
        nickname: [
          {
            validator: valiNickname,
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: valiEmail,
            trigger: "blur"
          }
        ],
        validatecode: [
          // 验证码
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        password: [
          // 密码
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        confirmpass: [
          // 确认密码
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["islogined", "userinfo"]), 
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO","QUIT_LOGIN"]),
    handleSelect(key, keyPath) {
      if (key === "1") {
        this.$router.push("/");
      } else if (key !== "5") {
        if (this.islogined) {
          // 观察是否登录
          if (key === "2") {
            this.$router.push("/myarticle");
          }
          if (key === "6") {
            this.$router.push("/newartic");
          }
          if (key === "4") {
            this.$router.push("/friends");
          }
          if (key === "3") {
            this.$router.push("/myinfo");
          }
        } else {
          this.activeIndex = "1";
          this.$message.error("请先登录！");
        }
      }

      if (key === "5-1") {
        var vm = this;
        // 如果是退出登录
        this.$confirm("请问你是否确定要退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log("退出登录");
            vm.$api
              .userLogout({
                userid: vm.userinfo.userId
              })
              .then(r => {
                if (r.data.ok) {
                  vm.QUIT_LOGIN();
                } else { 
                  this.$message.error(r.data.msg);
                  this.$router.push("/");
                }
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(e => {
            console.log(e);
          });
      }

      console.log(key);
    },
    registDialog: function() {
      this.islogin = false;
    },
    submitForm(formName) {
      var vm = this;
      // 提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "logininfo") {
            // 登录
            this.$api
              .userLogin({
                account: this.logininfo.account,
                pwd: this.getmd5(this.logininfo.pwd) // 表单md5加密
              })
              .then(r => {
                let response = r.data;
                if (response.ok) {
                  this.$message.success("登录成功");
                  this.RECORD_USERINFO(response.data);
                  // 修改状态
                  this.dialogVisible = false;
                } else {
                  this.$message.error(response.msg);
                }
                console.log(response);
              })
              .catch(e => {
                console.log(e);
              });
          } else if (formName === "registinfo") {
            // 注册
            this.$api.registUser({
              nickname: this.registinfo.nickname,
              email: this.registinfo.email,
              validatecode: this.registinfo.validatecode,
              password: this.getmd5(this.registinfo.password), // md5加密
              confirmpass: this.getmd5(this.registinfo.confirmpass)
            })
            .then(r=>{
               if(r.data.ok){
                 this.$message.success("注册成功!");
                 this.logininfo.account = this.registinfo.email;
                 this.logininfo.pwd = this.registinfo.password;
                 this.islogin = true;
                 this.resetForm('registinfo');
               }else { 
                 this.$message.error(r.data.msg);
               }
            }).catch(e=>{
              console.log(e);
              this.$message.error("注册失败，请重试!")
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    },
    handlevalibtn: function() { // 点击发送邮件
      this.isValiDisabled = true;
      this.btnvalitext = "请在" + this.timer + "s后重试";
      // 执行发送邮件逻辑
      this.$api.sendEmail({
        touser: this.registinfo.email,
        nickname: this.registinfo.nickname
      }).then(r=>{
        console.log(r);
      }).catch(e=>{
        this.$message.errror("对不起发送失败请稍后重试！");
      });
      let thtimer = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          this.btnvalitext = "请在" + this.timer + "s后重试";
        } else {
          this.isValiDisabled = false;
          this.timer = 60;
          this.btnvalitext = "发送验证码";
          window.clearInterval(thtimer);
        }
      }, 1000);
    },
    getmd5: function(data){ // md5加密
      var a;
      var md5 = crypto.createHash("md5");
      md5.update(data);
      a = md5.digest('hex');
      return a;
    }
  }
};
</script>

<style scope>
.newaccspan {
  cursor: pointer;
  color: rgb(55, 55, 56);
  margin-left: 30px;
  display: inline-block;
  height: 50px;
  line-height: 40px;
}
</style>