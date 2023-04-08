<template>
    <v-app class="home-container">
        <v-card class="mb-7" color="primary" rounded="0">
            <h1>SingCon 2023</h1>
        </v-card>

        <h3>请扫描票面二维码</h3>
        
        <img src="qr.png" class="qr" v-if="!scanner_loaded || loading"/> 

        <StreamBarcodeReader
            v-if = "!loading"
            class="qr"  
            @decode="onDecode"
            @loaded="onLoaded"
        ></StreamBarcodeReader>
        
        <v-alert 
            :class= "'alert '+ (alert? '' : 'd-none') "
            color="warning"
            density="compact"
            :text = "alert_text"
        ></v-alert>

    </v-app>

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
        };
    },


    computed: {
        
    },

    methods: {
        onDecode(text) {
            console.log(`Decode text from QR code is ${text}`)
            const domain = decodeURI(text).split('=')[0];
            const key = decodeURI(text).split('=')[1];
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
                        this.loading = false;
                        if (response.data.code == '200'){
                            console.log("not binded or refused")
                            //检查微信环境
                            if (/MicroMessenger/i.test(window.navigator.userAgent)){
                                console.log("wechat")
                                this.$router.push('/wechat', {query: {user_key: key}});
                            }
                        }
                        else if (response.data.code == '201' || response.data.code == '202'){
                            this.$router.push('/vote', {query: {user_key: key}});
                        }
                        else if (response.data.code == '401'){
                            console.log("haven't checked in")
                            this.alert_text='未入场，请先入场签到。'
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 10000);
                        }
                        else{
                            console.log("invalid try again")
                            this.alert_text='扫描失败请重试'
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 2000);
                        }
                    }
                )
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                    this.alert_text = '扫描失败请重试'
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                    }, 2000);
                });
            } else {
                console.log("invalid try again")
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
    padding: 20px 0 20px 0;
    margin-top: 20px;
    width: 80%;
    align-self: center;
}

.qr{
    margin-top:4vh;
    width:80%;
    height: calc(80vw);
    align-self: center;
}

.hide{
    display:none;
}

h1{
  padding-top: 15px;
  margin-bottom: 15px;
}

</style>

