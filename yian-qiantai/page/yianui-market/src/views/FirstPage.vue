<template>

  <el-form
   
    label-position="left"
    class="demo-ruleForm login-container"
  
  >
    <!-- <el-form-item>
          <img style="width:24px;height:24px;position:relative;margin-right:327px;top:54px;"  src="@/assets/icon_back@2x.png" />   
    </el-form-item> -->
   <el-form-item>
          <img style="width:131px;height:25px;position:relative;margin-right:220px;margin-top:5%;"  src="@/assets/logo.png" />   
          <el-col :span="10" class="cw-1">
           电子保修卡
           </el-col>
    </el-form-item>

     <el-form-item>
     <div>
    
     <div class="bbb">
      <!-- `checked` 为 true 或 false -->
       <el-checkbox  v-model="checked">我同意</el-checkbox>
      </div>
<div >
  <el-link style="right:70px;" type="primary" href="#/privacyexplain" target="_blank">《电子保修卡隐私政策》</el-link>
  
</div>

      <!-- <div>
      <el-col :span="30" class="cw-3" style="position:relative;margin-left:5px;top:10px;">
     
      </el-col>
      </div> -->
      </div>
      </el-form-item>
     <el-form-item>
         <div>
         <div>
         <div class="cw-5">
          <el-col :span="28" class="cw-7">
            个人用户
            </el-col>
             <el-col :span="28" class="cw-8">
            PERSONAL USER
            </el-col>
            <img style="width:88px;height:88px;position:relative;margin-top:16px;"  src="@/assets/icon_gr@2x.png" />  
                  <router-link to="/cardpersonal">
                     <el-button round style="width:120px;height:40px;po;margin-top:0px;"  @click.native.prevent="login">点击进入</el-button>
                   </router-link>
                   </div>
<div>
         <div class="cw-6">
          <el-col :span="28" class="cw-10">
            企业用户
            </el-col>
             <el-col :span="28" class="cw-11">
           ENTERPRISE USER
            </el-col>
            <img style="width:88px;height:88px;position:relative;left:10px;margin-top:16px;"  src="@/assets/icon_gr copy@2x.png" />   
                   <router-link to="/cardhospital">
                   <el-button round style="width:120px;height:40px;margin-top:0px;"  @click.native.prevent="login1">点击进入>></el-button>
                   </router-link>

              </div> 
        </div> 
        </div>   
        </div>
    </el-form-item>
     <el-form-item>
            <img style="width:375px;height:265px;position:relative;top:37.5px;"  src="@/assets/img_bg@2x.png" />   
    </el-form-item>
    <template>
 
</template>

  </el-form>
</template>

 
<script>
import { mapState } from 'vuex'
import Cookies from "js-cookie"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      checked: false,
      //加
       loginForm: {
        account: 'cardAdmin',
        password: 'cardAdmin',
      }, 
      //加
    }
  },
  methods:{
  	go(){
  		this.$router.push('/cardpersonal')
    },
    //加
      login() { if (!this.checked) {
        alert('请同意《电子保修卡隐私政策》');
        return false;
    }
      this.loading = true
      let userInfo = {account:this.loginForm.account, password:this.loginForm.password}
      this.$api.login.login(userInfo).then((res) => {
          if(res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {
            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push('/cardpersonal')  // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch((res) => {
          this.$message({
          message: res.message,
          type: 'error'
          })
        });
    },
    //加
     //加
      login1() {if (!this.checked) {
        alert('请同意《电子保修卡隐私政策》');
        return false;
    }
      this.loading = true
      let userInfo = {account:this.loginForm.account, password:this.loginForm.password}
      this.$api.login.login(userInfo).then((res) => {
          if(res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {
            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push('/cardhospital')  // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch((res) => {
          this.$message({
          message: res.message,
          type: 'error'
          })
        });
    },
    //加
  }
}
</script>

<style lang="scss" scoped>
.div-inline{ 
  float:left;
  } 
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  position: relative; 
  right:170px;
  width: 415px;
 
  padding: 0px 0px 0px 0px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 0px #cac6c6;
}

.cw-1{
position:relative;
margin-left:20px;
margin-top:1%;
font-family: PingFangSC-Regular;
font-size: 30px;
color: #333333;
line-height: 30px;
}
.cw-2{
position:relative;
left:24px;
font-family: PingFangSC-Regular;
font-size: 16px;
color: #333333;
line-height: 20px;
}
.cw-3{
position:relative;
margin-left:47px;
font-family: PingFangSC-Regular;
font-size: 14px;
color: #854FC1;
line-height: 20px;
}

.cw-5{
position:relative;
background: #FEE9C7;
border-radius: 8px;
width:156px;
height:220px;
margin-left:35px;
float:left;
}
.cw-6{
background: #E3E8FE;
border-radius: 8px;
width:156px;
height:220px;
margin-left:35px;
float:left;
}
.cw-7{ 
font-family: PingFangSC-Medium;
font-size: 20px;
color: #643232;
line-height: 20px;
position:relative;
margin-left:38px;
margin-top:16px;
}
.cw-8{
font-family: PingFangSC-Regular;
font-size: 12px;
color: #643232;
line-height: 12px;
position:relative;
margin-left:20px;
margin-top:5px;
}
.cw-9{

opacity: 0.9;
background: #FFFFFF;
border-radius: 16px;
width:124px;
height:32;
margin-bottom:16px;
margin-left:16px;
}
.cw-10{ 
font-family: PingFangSC-Medium;
font-size: 20px;
color: #3849A2;
line-height: 20px;
position:relative;
margin-left:38px;
margin-top:16px;
}
.cw-11{
font-family: PingFangSC-Regular;
font-size: 12px;
color: #3849A2;
line-height: 12px;
position:relative;
margin-left:20px;
margin-top:5px;
}
.cw-12{
opacity: 0.9;
background: #FFFFFF;
border-radius: 16px;
width:124px;
height:32;
margin-bottom:16px;
margin-left:16px;
}
.aaa{
float:left;
}
.bbb{
margin-left:50px;

float:left;
}
.ccc{
float:left;
}
</style>
