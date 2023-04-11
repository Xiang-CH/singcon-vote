<template>

        <h3 v-if="!hidescanner" style="margin:4vh;">请扫描票面二维码</h3>
        
        
        <img style="padding:0 10vw 0 10vw;" src="qr.png" class="qr" v-if="!scanner_loaded || loading"/> 


        <StreamBarcodeReader
        v-if = "!loading && !hidescanner"
        class="qr"  
        @decode="onDecode"
        @loaded="onLoaded"
        ></StreamBarcodeReader>

        <div v-if="hidescanner && loaded" class="success">
            <div class="wechatPrompt">
                <h3>前往微信扫描打开</h3>
                <h3>可获取噗噗纪念头像奖励</h3>
            </div>
            <v-btn
                color="grey w-75 mx-auto my-3"
                @click="verifyRefused()"
            >直接打开</v-btn>
            <v-overlay
                v-model="overlay"
                contained
                class="align-center justify-center"
            >
                <img src="loading.gif" style="margin-bottom: 30vh;"/>
            </v-overlay>
        </div>
        
        <v-alert 
            :class= "'alert '+ (alert? '' : 'd-none') "
            color="warning"
            density="compact"
            :text = "alert_text"
        ></v-alert>




</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import axios from 'axios';

export default {
    components: {
        StreamBarcodeReader
    },
    data() {
        return {
            scanner_loaded : false,
            alert: false,
            alert_text: '扫描失败请重试',
            loading: false,
            isWechat: false,
            hidescanner: false,
            key: "",
            loaded : true,
            overlay: false,
        };
    },


    computed: {
        
    },

    methods: {
        verifyInWechat(){
            sessionStorage.setItem("user_key", this.key);
            const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91a4ad470fb0b432&redirect_uri=https%3A%2F%2Fone.hkupootal.com%3Furl%3Dhttps%253A%252F%252Fsingcon23.hkupootal.com%252Fwechat&response_type=code&scope=snsapi_userinfo#wechat_redirect";
            //const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91a4ad470fb0b432&redirect_uri=https%3A%2F%2Fone.hkupootal.com%3Furl%3Dhttps%253A%252F%252F1d17-202-189-110-181.ngrok-free.app%252Fwechat&response_type=code&scope=snsapi_userinfo#wechat_redirect";
            window.location.href = url
        },

        verifyRefused(){
            this.overlay = true;
            axios.post('https://api.singcon23.hkupootal.com/user/refuse.php', {
                user_key: this.key
            }  , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(
                (res) => {
                    this.overlay = false
                    console.log(res.data)
                    if (res.data.code == '200'){
                        this.$router.push({ name: 'vote', params: {user_key: this.key} });
                    }
                    else if(res.data.code == '400'){
                        this.loaded = false
                        this.alert_text='无效票，请尝试新扫描'
                        this.alert = true;
                    }
                    else if(res.data.code == '401'){
                        this.loaded = false
                        this.alert_text='未入场，请先入场签到'
                        this.alert = true;
                    }else{
                        this.loaded = false
                        this.alert_text='验证失败请重试'
                        this.alert = true;
                        setTimeout(() => {
                            this.loaded = true;
                        }, 2000);
                    }
                }
            )
            .catch(
                (err) => {
                    this.overlay = false
                    console.log(err)
                    this.loaded = false
                    this.alert_text='验证失败请重试'
                    this.alert = true;
                    setTimeout(() => {
                        this.loaded = true;
                    }, 2000);
                }
            )
        },

        onDecode(text) {
            console.log(`Decode text from QR code is ${text}`)
            const domain = decodeURI(text).split('=')[0];
            const key = decodeURI(text).split('=')[1];
            this.key = key
            console.log(key)
            if (domain == 'https://v.6re.co?k'){
                this.loading = true
                axios
                .post('https://api.singcon23.hkupootal.com/user/check.php', {
                    user_key: key
                }  , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    response => {
                        console.log(response.data);
                        if (response.data.code == '200'){
                            console.log("not binded or refused")
                            
                            //检查微信环境
                            if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"){
                                console.log("wechat")
                                this.verifyInWechat()
                            }
                            else{
                                this.loading = false
                                this.hidescanner = true
                            }
                        }
                        else if (response.data.code == '201' || response.data.code == '202'){
                            this.$router.push({ name: 'vote', params: {user_key: key} });
                        }
                        else if (response.data.code == '401'){
                            console.log("haven't checked in")
                            this.alert_text='未入场，请先入场签到。'
                            this.alert = true;
                            setTimeout(() => {
                                this.loading = false;
                                this.alert = false;
                            }, 10000);
                        }
                        else{
                            console.log("invalid try again")
                            this.alert_text='扫描失败请重试'
                            this.alert = true;
                            setTimeout(() => {
                                this.loading = false;
                                this.alert = false;
                            }, 2000);
                        }
                    }
                )
                .catch(error => {
                    console.log(error);
                    this.alert_text = '请求失败请重试'
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                        this.loading = false;
                    }, 2000);
                });
            } else {
                console.log("invalid ticket")
                this.alert_text='非票面二维码'
                this.alert = true;
                setTimeout(() => {
                    this.alert = false;
                }, 2000);
            }
        }, 

        onLoaded() {
            this.scanner_loaded = true;
        },
    }
};
</script>

<style>

.alert{
    flex:0 !important;
    margin-top: 20px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}


.qr{
    margin-top:2vh;
    width:70%;
    margin-left:auto;
    margin-right:auto;
}

.hide{
    display:none;
}

h1{
  padding-top: 15px;
  margin-bottom: 15px;
}

.wechatPrompt{
    color: #104e8d;
    margin-top: 60px;
    margin-bottom: 30px;
    text-align: center;
}

</style>

