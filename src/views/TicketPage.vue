<template>

    <v-alert 
            v-if = "alert"
            class= "mt-10 alert"
            color="warning"
            density="compact"
            :text = "alert_text"
    ></v-alert>

    <div v-if="loaded">
            <h2 style="margin-top: 15vh; margin-bottom: 20px;">扫描成功</h2>
            <div class="wechatPrompt">
                <h3>前往微信扫描打开</h3>
                <h3>可获取噗噗纪念头像奖励</h3>
            </div>
            <!-- <v-btn
                color="primary w-75 mx-auto my-3"
                @click="verifyInWechat()"
            >跳转至微信打开</v-btn> -->
            <v-btn
                color="grey w-50 mx-auto my-3"
                @click="verifyRefused()"
            >直接打开</v-btn>
            <v-overlay
                v-model="overlay"
                contained
                class="align-center justify-center"
            >
                
                <img src="loading.gif"/>
            </v-overlay>
    </div>

    <StaffBtn/>
   


</template>

<script>
import axios from 'axios';
import StaffBtn from '../components/StaffBtn.vue';

export default{
    components: {
        StaffBtn
    },
    data(){
        return{
            loaded :false,
            alert: false,
            alert_text: '扫描失败请重试',
            key: "",
            overlay: true,
        }
    },
    methods:{
        verifyInWechat(){
            sessionStorage.setItem('user_key', this.key)
            this.overlay = true;
            const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91a4ad470fb0b432&redirect_uri=https%3A%2F%2Fone.hkupootal.com%3Furl%3Dhttps%253A%252F%252Fsingcon23.hkupootal.com%252Fwechat&response_type=code&scope=snsapi_userinfo#wechat_redirect";
            //const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91a4ad470fb0b432&redirect_uri=https%3A%2F%2Fone.hkupootal.com%3Furl%3Dhttps%253A%252F%252Fsingcon23.hkupootal.com%252Fwechat&response_type=code&scope=snsapi_base#wechat_redirect";
            window.location.href = url;
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
                    console.log(res.data)
                    this.overlay = false;
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
                    console.log(err)
                    this.overlay = false;
                    this.loaded = false
                    this.alert_text='验证失败请重试'
                    this.alert = true;
                    setTimeout(() => {
                        this.loaded = true;
                    }, 2000);
                }
            )
        },

        
    },
    mounted(){
            console.log("mounted")
            const key = this.$router.currentRoute.value.query.k
            console.log(key)
            this.key = key
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
                        this.overlay=false;
                        if (response.data.code == '200'){
                            console.log("not binded or refused")
                            //检查微信环境
                            if (/MicroMessenger/i.test(window.navigator.userAgent)){
                                console.log("wechat")
                                this.verifyInWechat()
                            }
                            else{
                                this.loaded = true
                            }
                        }
                        else if (response.data.code == '201' || response.data.code == '202'){
                            this.$router.push({ name: 'vote', params: {user_key: key} });
                        }
                        else if (response.data.code == '401'){
                            console.log("haven't checked in")
                            this.alert_text='未入场，请先入场签到。'
                            this.alert = true;
                        }
                        else{
                            console.log("invalid try again")
                            this.alert_text='扫描失败请重试'
                            this.alert = true;
                        }
                    }
                )
                .catch(error => {
                    console.log(error);
                    this.overlay=false;
                    this.alert_text = '扫描失败请重试'
                    this.alert = true;
                });
        }
}
</script>


<style>
.ticketPageContainer{
   position: relative
}
.wechatPrompt{
    color: #104e8d;
    margin-top: 60px;
    margin-bottom: 30px;
    text-align: center;
}
</style>