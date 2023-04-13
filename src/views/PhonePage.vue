<template>
  <h1 style="margin-top: 10px">检票</h1>

  <div v-if="status == 'scan'">
    <StreamBarcodeReader
      :style="
        'margin-left: auto; margin-right: auto; width: 75vw;' +
        (alert || fail || success ? 'margin-top: 20px;' : 'margin-top: 73px;')
      "
      @decode="onDecode"
      @loaded="
        () => {
          loading = false;
        }
      "
    ></StreamBarcodeReader>
  </div>

  <div style="margin-top: 100px" v-if="status == 'success'">
    <img src="/success.png" style="width: 120px; height: 120px" />
    <h1>检票成功</h1>
    <div style="margin-top: 40px; color: #bbbbbb">
      <h5>票号： {{ user_key }}</h5>
      <h5>入场时间：{{ checkin_time }}</h5>
      <h5>已入场人数：{{ checkin_user_count }}</h5>
      <h5>{{ rid }}</h5>
    </div>
  </div>

  <div style="margin-top: 100px" v-if="status == 'wrong_ticket'">
    <img src="/fail.png" style="width: 120px; height: 120px" />
    <h1>无效票</h1>
    <div style="margin-top: 40px; color: #bbbbbb">
      <h5>票号： {{ user_key }}</h5>
      <h5>{{ rid }}</h5>
    </div>
  </div>

  <div style="margin-top: 100px" v-if="status == 'has_checked_in'">
    <img src="/fail.png" style="width: 120px; height: 120px" />
    <h1>已入场</h1>
    <div style="margin-top: 40px; color: #bbbbbb">
      <h5>票号： {{ user_key }}</h5>
      <h5>入场时间：{{ checkin_time }}</h5>
      <h5>{{ rid }}</h5>
    </div>
  </div>

  <div style="margin-top: 100px" v-if="status == 'error'">
    <img src="/fail.png" style="width: 120px; height: 120px" />
    <h1>{{ error_msg }}</h1>
  </div>

  <v-btn
    color="primary w-75 mx-auto"
    @click="this.status = 'scan'"
    style="margin-top: 60px"
    v-if="status != 'scan'"
    >扫描</v-btn
  >
</template>

<script>
import axios from "axios";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  components: {
    StreamBarcodeReader,
  },

  data() {
    return {
      token: "",
      status: "scan",
      error_msg: "",
      checkin_user_count: "",
      checkin_time: "",
      user_key: "",
      rid: "",
      loading: false,
    };
  },

  mounted(){
    this.token = this.$router.currentRoute.value.params.token;
  },

  methods: {
    onDecode(text) {
      if (this.status != "scan") {
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      console.log(`Decode text from QR code is ${text}`);
      const domain = decodeURI(text).split("=")[0];
      const key = decodeURI(text).split("=")[1];
      if (domain != "https://v.6re.co?k") {
        this.error_msg = "无效的二维码";
        this.status = "error";
        this.loading = false;
        const fail_audio = new Audio("/fail.mp3");
        fail_audio.play();
        return;
      }
      axios
        .post(
          "https://api.singcon23.hkupootal.com/admin/checkin.php",
          {
            token: this.token,
            user_key: key,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.loading = false;
          if (res.data.code == "200") {
            this.status = "success";
            this.user_key = res.data.user_key;
            this.rid = res.data.rid;
            this.checkin_user_count = res.data.checkin_user_count;
            this.checkin_time = res.data.checkin_time;
            const success_audio = new Audio("/success.mp3");
            success_audio.play();
          } else if (res.data.code == "401") {
            this.status = "has_checked_in";
            this.user_key = res.data.user_key;
            this.rid = res.data.rid;
            this.checkin_time = res.data.checkin_time;
            const fail_audio = new Audio("/fail.mp3");
            fail_audio.play();
          } else if (res.data.code == "400") {
            this.status = "wrong_ticket";
            this.user_key = res.data.user_key;
            this.rid = res.data.rid;
            const fail_audio = new Audio("/fail.mp3");
            fail_audio.play();
          } else {
            this.error_msg = res.data.msg;
            this.status = "error";
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.error_msg = "请重试";
          this.status = "error";
          const fail_audio = new Audio("/fail.mp3");
          fail_audio.play();
        });
    },
  },
};
</script>

<style>
</style>