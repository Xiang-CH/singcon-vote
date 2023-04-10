<template>

</template>

<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'

export default {
    mounted: function(){
        const code = this.$router.currentRoute.value.query.code
        const user_key = wx.getStorageSync('user_key')
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
            if (res.data.code == '200'){
                this.$router.push({ name: 'vote', params: {user_key: user_key} });
            }
            else if (res.data.code == '400'){
                console.log("invalid ticket")
            }
            else if (res.data.code == '401'){
                console.log("not checked in")
            }
            else if (res.data.code == '403'){
                console.log("not pupu user")
            }else{
                console.log("error")
            }
        })
        .catch(error => {
            console.log(error);
        })
    },

    data(){
        return{
            code: null,
        }
    }
}

</script>