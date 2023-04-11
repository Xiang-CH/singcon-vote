<template>
     <v-alert 
            v-if = "alert"
            class= "mt-10 alert"
            color="warning"
            density="compact"
            :text = "alert_text"
    ></v-alert>
    <img src="/loading.gif" v-if="loading" class="loading"/>
</template> 

<script>
import axios from 'axios'

export default {

    methods: {
        verifyRefused(key){
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
                    this.loading = false
                    console.log(res.data)
                    if (res.data.code == '200'){
                        this.$router.push({ name: 'vote', params: {user_key: key} });
                    }
                    else if(res.data.code == '400'){
                        this.alert_text='无效票，请尝试新扫描'
                        this.alert = true;
                        setTimeout(() => {
                            this.$router.push({ name: 'home' });
                        }, 2000);
                    }
                    else if(res.data.code == '401'){
                        this.alert_text='未入场，请先入场签到'
                        this.alert = true;
                    }else{
                        this.alert_text='验证失败请重试'
                        this.alert = true;
                        setTimeout(() => {
                            this.$router.push({ name: 'home' });
                        }, 2000);
                    }
                }
            )
            .catch(
                (err) => {
                    this.loading = false;
                    console.log(err)
                    this.alert_text='验证失败请重试'
                    this.alert = true;
                    setTimeout(() => {
                        this.$router.push({ name: 'home' });
                    }, 2000);
                }
            )
        },
    },

    mounted: function(){
        const code = this.$router.currentRoute.value.query.code
        const user_key = sessionStorage.getItem('user_key')
        console.log(code);
        console.log(user_key);

        axios.post('https://api.singcon23.hkupootal.com/user/bind.php',{
            code: code,
            user_key: user_key
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res.data)
            this.loading = false;
            if (res.data.code == '200'){
                this.$router.push({ name: 'vote', params: {user_key: user_key} });
            }
            else if (res.data.code == '201'){
                this.loading = true;
                this.verifyRefused(user_key);
            }
            else if (res.data.code == '400'){
                this.alert_text = '无效票，请尝试新扫描'
                this.alert = true;
                setTimeout(() => {this.$router.push({ name: 'home' });}, 3000);
            }
            else if (res.data.code == '401'){
                this.alert_text = '未入场，请先入场签到'
                this.alert = true;
                setTimeout(() => {this.$router.push({ name: 'home' });}, 3000);
            }
            else{
                this.alert_text = '绑定失败，请重试'
                this.alert = true;
                setTimeout(() => {this.$router.push({ name: 'home' });}, 3000);
            }
        })
        .catch(error => {
            this.loading = false;
            console.log(error);
            this.alert_text = '请求失败，请重试'
            this.alert = true;
            setTimeout(() => {
                this.$router.push({ name: 'home' });
            }, 3000);
        })
    },

    data(){
        return{
            code: null,
            alert: false,
            alert_text: null,
            loading: true,
        }
    }
}

</script>

<style>
.loading {
  position: absolute;
  top:45vh;
  left:40vw;
  width: 20vw;
}
</style>