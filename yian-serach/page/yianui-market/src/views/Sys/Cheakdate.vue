<template>
    <el-form label-position="left" class="demo-ruleForm login-container">
    <img style="width:131px;height:25px;position:relative;margin-right:220px;margin-top:60px;"  src="@/assets/logo.png" />   
    <el-form-item header-align="center" prop="serialnumber" label="" label-width="190px">
    <el-input style="width:230px;right:150px;font-size:14px;margin-top:50px;"  type="text" header-align="left"   label-width="15px" font-size="10px"
      placeholder="请输入序列号进行查询"  v-model="loginForm.serialnumber"  auto-complete="off" maxlength="14"></el-input>    
    <el-button style="position:relative;left:30px;bottom:40px;" type="primary" icon="el-icon-search"   @click="login">搜索</el-button>  
    </el-form-item>
    <el-form-item>
    <img style="width:375px;height:265px; position:relative;margin-top:10px"  src="@/assets/a577e1cc5b187e383830d565dac714c.png" />   
    </el-form-item>
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
  
    //加
      login() { 
        var reg = new RegExp(/^AS\d{12}$/)
      if (!reg.test(this.loginForm.serialnumber)) {
        this.serialnumberShow = true
          this.$message({ message: "序列号输入不正确：AS开头，后跟12位数字 ！", type: "error" });
          return false;
				this.serialnumberText = '序列号输入不正确：AS开头，后跟12位数字'
			} else {
				this.serialnumberShow = false
        //this.loginForm.productmodel = this.loginForm.serialnumber.slice(0,3)
        
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
            var serialnumber=this.loginForm.serialnumber;
            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push({path:'/queryresults',query:{name:JSON.stringify(serialnumber)}})  // 登录成功，跳转到主页
         
          }
          this.loading = false
        }).catch((res) => {
          this.$message({
          message: res.message,
          type: 'error'
          })
        });
    },
    
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
 //margin: 0px auto;
  width: 420px;
  height:600px;
  padding: 0px 0px 0px 0px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 0px #cac6c6;
}

</style>
