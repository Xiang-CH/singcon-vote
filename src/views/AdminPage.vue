<template>

        <v-alert 
            :class= "'alert mt-3 '+ (alert? '' : 'd-none') "
            color="warning"
            density="compact"
            :text = "alert_text"
        ></v-alert>

        <v-card 
            :class="'mx-auto w-75 px-6 py-8 bg-grey-lighten-5 ' + (alert? 'mt-5': 'mt-16')" 
            max-width="344"
            v-if = "!loggedin"
        >
            <h3 class="mb-10">后台登陆</h3>
            <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            >
            <v-text-field
                v-model="username"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                label="Staff 用户名"
            ></v-text-field>
    
            <v-text-field
                v-model="password"
                type="password"
                :readonly="loading"
                :rules="[required]"
                clearable
                label="Staff 密码"
                placeholder="Enter your password"
            ></v-text-field>
    
            <br>
    
            <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="primary"
                size="large"
                type="submit"
                variant="elevated"
            >
                登陆
            </v-btn>
            </v-form>
        </v-card>

        <div v-else>

            <div v-if="checkInMode">
                <StreamBarcodeReader
                    style="margin-left: auto; margin-right: auto;"
                    v-if = "!isWechat"
                    :class="'qr '+(alert? 'mt-3': 'mt-16')" 
                    @decode="onDecode"
                ></StreamBarcodeReader>
                <v-btn
                    class="mt-8"
                    @click="() => {this.checkInMode = false; this.alert = false}"
                    size="large"
                    color="secondary"
                >
                    管理模式
                </v-btn>
            </div>

            <div v-else>
                <v-btn
                    class="mt-8"
                    @click="() => {checkIfWechat()}"
                    size="large"
                    color="primary"
                >
                    签票模式
                </v-btn>
            </div>
            
        </div>





</template>

<script>
    import axios from 'axios'
    import wx from 'weixin-js-sdk'
    import { StreamBarcodeReader } from "vue-barcode-reader";

    export default{
        components: {
            StreamBarcodeReader
        },

        data(){
            return{
                loggedin : false,
                form: false,
                username: null,
                password: null,
                loading: false,
                alert: false,
                alert_text: "登陆失败请重试",
                token: null,
                checkInMode: false,
                isWechat: false,
            }
        },


        methods: {
            onDecode(text) {
                console.log(`Decode text from QR code is ${text}`)
                const domain = decodeURI(text).split('=')[0];
                const key = decodeURI(text).split('=')[1];
                if (domain != 'https://v.6re.co?k'){
                    this.alert_text = "无效的二维码"
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                    }, 1000);
                    return
                }
                axios.post("https://api.singcon23.hkupootal.com/admin/checkin.php",{
                    token: this.token,
                    user_key: key
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    (res) => {
                        if(res.data.code == "200"){
                            this.alert_text = "签到成功"
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 1000);
                        }else if (res.data.code == "400"){
                            this.alert_text = "无效票"
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 1000);
                        }else if (res.data.code == "401"){
                            this.alert_text = "已入场"
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 1000);
                        }else if (res.data.code == "500"){
                            this.alert_text = "签到失败"
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 1000);
                        }else{
                            this.alert_text = "staff登陆过期, 刷新网页重新登陆"
                            this.alert = true;
                        }
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                        this.alert_text = "签到失败"
                        this.alert = true;
                        setTimeout(() => {
                            this.alert = false;
                        }, 1000);
                    }
                )
                
            },

            configWechat(){
                return new Promise ((resolve, reject) => {
                    alert(location.href)
                    axios.post("https://api.singcon23.hkupootal.com/wechat/sign.php", 
                    {url: location.href.split('#')[0]}, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(
                        res => {
                            if(res.status == 200){
                                wx.config({
                                    debug: true,
                                    appId: res.data.appId,
                                    timestamp: res.data.timestamp,
                                    nonceStr: res.data.nonceStr,
                                    signature: res.data.signature,
                                    jsApiList: res.data.jsApiList
                                })
                                resolve()
                            }else{
                                this.alert_text = "微信签名失败, 尝试重新打开"
                                this.alert = true;
                                reject()
                            }
                        }
                    ).catch(
                        (err) => {
                            console.log(err)
                            this.alert_text = "微信签名失败, 尝试重新打开"
                            this.alert = true;
                            reject()
                        }
                    )
                })
            },

            checkIfWechat(){
                this.checkInMode = true
                //检查微信环境
                if (/MicroMessenger/i.test(window.navigator.userAgent)){
                    this.isWechat=true;
                    this.configWechat().then(
                        () => {
                            wx.ready( () => {
                                console.log("WXready")
                            })

                            wx.error( () => {
                                console.log("WXerror")
                            })
                        }

                    )
                }
            },
            onSubmit () {
                if (!this.form) return

                this.loading = true

                axios.post('https://api.singcon23.hkupootal.com/admin/login.php', {
                    admin_name: this.username,
                    admin_password: this.password
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    (res) => {
                        this.loading = false
                        if(res.data.code == "200"){
                            this.loggedin = true;
                            this.token = res.data.token;
                        }
                        else if(res.data.code == "400"){
                            this.alert_text = "用户名或密码错误"
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 5000);
                        }
                        else{
                            this.alert_text = "登陆失败请重试"
                            this.alert = true;
                            setTimeout(() => {
                                this.alert = false;
                            }, 5000);
                        }
                    }
                ).catch(() => {
                    this.loading = false
                    this.alert_text = "登陆失败请重试"
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                    }, 5000);
                })

            },

            required (v) {
                return !!v || '必填项'
            },
        }
        
    }
</script>

<style>

</style>