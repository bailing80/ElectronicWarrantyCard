<template>
  <el-form label-position="left" class="demo-ruleForm login-container" style="" >
    <router-link to="/">
      <img
        style="width:20px;height:20px;position:absolute; top:18px;left:10px;"
        src="@/assets/icon_back@2x.png"
      />
    </router-link>
    <p style="position:absolute;margin-top:18px;left:130px;">隐私说明</p>
    <div style="width:360px;position:absolute;margin-top:50px;left:20px;">
      <p style="position:absolute;margin-top:18px;">隐私说明文案：</p>
      <br />
      <br />
      <p align="left">
        一、适用范围
        <br />
        <br />&nbsp; &nbsp; &nbsp; &nbsp; 您在注册和使用小牛科技电子保修卡（以下简称“保修卡”）过程中，根据要求自愿提供的个人信息；
      </p>
      <p align="left">
        二、信息使用
        <br />
        <br />&nbsp; &nbsp; &nbsp; &nbsp;小牛科技不会向任何人出售或出借您的个人信息，除非事先得到您的许可。
        为服务用户的目的，小牛科技可能通过使用您的个人信息，向您提供服务，包括但不限于向您发出活动和服务信息等。
        小牛科技承诺：非经合法程序或经您的许可不会泄露您的个人信息（如昵称、肖像、联系方式、区域、健康信息等）。
      </p>

      <p align="left">
        三、信息披露 Information Disclosure
        <br />
        <br />&nbsp; &nbsp; &nbsp; &nbsp;您的个人信息将在下述情况下部分或全部被披露：
        <br />1、经您同意，向第三方披露；
        <br />2、根据法律、法规的有关规定，或者行政或司法机构的要求等政府及法律强制性要求，向第三方或者行政、司法机构披露；
        <br />
        <br />
      </p>
      <p align="left">
        四、第三方的条款和条件 Third party’s terms and conditions
        <br />
        <br />&nbsp; &nbsp; &nbsp; &nbsp;请注意，您在使用和访问我们的服务时，可能还要遵守应用商店、地图提供商、移动软件平台、社交网站和支付中介等某些第三方的条款和条件以及隐私政策。您确认并同意，我们无需为这些第三方的条款和条件以及第三方如何使用您的个人信息承担责任。
        我们可能随时提供我们合作伙伴的服务，例如问卷调查等。它们的服务可能会要求您提供个人信息才能注册或访问。这些服务将会在您需要披露个人信息时标明合作伙伴的身份。如果您选择披露个人信息，那么这些数据则可能直接或通过我们间接提供给第三方。您将要接受它们这些第三方的隐私政策和做法。我们不为这些第三方的隐私政策和做法负责。因此，您应该在披露个人信息前审阅它们的隐私政策和做法。
        <br />
        <br />
      </p>
      <p align="left">
        五、关于免责 Disclaimer
        <br />
        <br />&nbsp; &nbsp; &nbsp; &nbsp;就下列相关事宜的发生，小牛科技不承担任何法律责任：
        <br />1、小牛科技经您许可或根据法律、法规或相关政府的强制性规定或要求提供您的个人信息；
        <br />2、非因小牛科技原因导致的个人信息的泄漏；
        <br />3、任何由于黑客攻击、电脑病毒侵入或政府管制等不可抗力原因而造成的信息泄露或服务停止；
        <br />4、因不可抗力导致的任何后果；
        <br />5、小牛科技在各服务条款及声明中列明的免责情形 。
        <br />
        <br />
      </p>
      <p align="left">
        六、政策修改 Modification of Policy
        <br />
        <br />&nbsp; &nbsp; &nbsp; &nbsp;小牛科技保留根据实际情况及国家法律、法规等制度对本政策作出不定时修改的权利。我们可能适时修订本隐私声明的条款，该等修订构成本隐私声明的一部分，我们将在修订生效前在应用程序中提示或向您发送电子邮件或以其他方式通知您，在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本隐私声明的约束。
        本隐私声明是您与小牛科技签署的注册协议的组成部分之一，请您仔细阅读，如有任何疑问，欢迎通过以下方式联系我们，我们会尽一切可能保护您的隐私。
      </p>
      <p>
        联系方式：400 610 8333
        <br />
      </p>
    </div>
  </el-form>
</template>

 
<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import ThemePicker from "@/components/ThemePicker";
import LangSelector from "@/components/LangSelector";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "",
      checked: false,
      //加
      loginForm: {
        account: "cardAdmin",
        password: "cardAdmin"
      }
      //加
    };
  },
  methods: {
    go() {
      this.$router.push("/cardpersonal");
    },
  }
};
</script>

<style lang="scss" scoped>
.div-inline {
  float: left;
}
.login-container {
  -webkit-border-radius: 0px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  //margin: 0px auto;
  position: relative; 
  right:162px;
  width: 402px;
  height: 1700px;

  padding: 0px 0px 0px 0px;
  background: #f1f3f4;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 0px #cac6c6;
}


.aaa {
  float: left;
}
.bbb {
  margin-left: 10px;
  float: left;
}
.ccc {
  float: left;
}
</style>
