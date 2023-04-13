<template>
  <v-alert
    v-if="alert"
    class="mt-10 alert"
    color="warning"
    density="compact"
    :text="alert_text"
  ></v-alert>
  <div class="wechatPrompt" v-if="show_promt">
    <h3>欢迎 {{ user_serial }}</h3>
    <h3>SingCon纪念头像已发送到你的噗噗账户</h3>
    <h4 style="margin-top: 30px">欢迎在噗噗SingCon专区分享决赛现场的感受</h4>
    <h4>或为自己支持的选手打call</h4>
    <v-btn color="primary w-75 mx-auto my-3" @click="nav2Vote()"
      >进入投票页面</v-btn
    >
  </div>
  <img src="/loading.gif" v-if="loading" class="loading" />
</template> 

<script>
import axios from "axios";

export default {
  methods: {
    verifyRefused(key) {
      this.overlay = true;
      axios
        .post(
          "https://api.singcon23.hkupootal.com/user/refuse.php",
          {
            user_key: this.key,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.loading = false;
          console.log(res.data);
          if (res.data.code == "200") {
            this.$router.push({ name: "vote", params: { user_key: key } });
          } else if (res.data.code == "400") {
            this.alert_text = "无效票，请尝试新扫描";
            this.alert = true;
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 2000);
          } else if (res.data.code == "401") {
            this.alert_text = "未入场，请先入场签到";
            this.alert = true;
          } else {
            this.alert_text = "验证失败请重试";
            this.alert = true;
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 2000);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.alert_text = "验证失败请重试";
          this.alert = true;
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 2000);
        });
    },
    nav2Vote(){
        const user_key = sessionStorage.getItem("user_key");
        this.$router.push({ name: "vote", params: { user_key: user_key } });
    }
  },

  mounted: function () {
    const code = this.$router.currentRoute.value.query.code;
    const user_key = sessionStorage.getItem("user_key");
    console.log(code);
    console.log(user_key);
    axios
      .post(
        "https://api.singcon23.hkupootal.com/user/bind.php",
        {
          code: code,
          user_key: user_key,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.loading = false;
        if (res.data.code == "200") {
          this.user_serial = res.data.user_serial;
          this.show_promt = true
        } else if (res.data.code == "201") {
          this.loading = true;
          this.verifyRefused(user_key);
        } else if (res.data.code == "400") {
          this.alert_text = "无效票，请尝试新扫描";
          this.alert = true;
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 3000);
        } else if (res.data.code == "401") {
          this.alert_text = "未入场，请先入场签到";
          this.alert = true;
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 3000);
        } else {
          this.alert_text = "绑定失败，请重试";
          this.alert = true;
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 3000);
        }
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
        this.alert_text = "请求失败，请重试";
        this.alert = true;
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 3000);
      });
  },

  data() {
    return {
      code: null,
      alert: false,
      alert_text: null,
      loading: true,
      user_serial: "",
      show_promt: false,
    };
  },
};
</script>

<style>
.wechatPrompt {
  color: #5c6bc0;
  margin-top: 60px;
  margin-bottom: 30px;
  text-align: center;
}
</style>