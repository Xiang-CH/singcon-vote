"use strict";(self["webpackChunkcssaud_singcon"]=self["webpackChunkcssaud_singcon"]||[]).push([[368],{4368:function(e,t,o){o.r(t),o.d(t,{default:function(){return m}});var a=o(3396);const s={key:1},l=(0,a._)("h2",{style:{"margin-top":"15vh","margin-bottom":"20px"}},"扫描成功",-1),r=(0,a._)("div",{class:"wechatPrompt"},[(0,a._)("h3",null,"前往微信扫描打开"),(0,a._)("h3",null,"可获取噗噗纪念头像奖励")],-1),n=(0,a._)("img",{src:"loading.gif"},null,-1);function i(e,t,o,i,c,h){const d=(0,a.up)("v-alert"),u=(0,a.up)("v-btn"),p=(0,a.up)("v-overlay"),y=(0,a.up)("StaffBtn");return(0,a.wg)(),(0,a.iD)(a.HY,null,[c.alert?((0,a.wg)(),(0,a.j4)(d,{key:0,class:"mt-10 alert",color:"warning",density:"compact",text:c.alert_text},null,8,["text"])):(0,a.kq)("",!0),c.loaded?((0,a.wg)(),(0,a.iD)("div",s,[l,r,(0,a.Wm)(u,{color:"grey w-50 mx-auto my-3",onClick:t[0]||(t[0]=e=>h.verifyRefused())},{default:(0,a.w5)((()=>[(0,a.Uk)("直接打开")])),_:1}),(0,a.Wm)(p,{modelValue:c.overlay,"onUpdate:modelValue":t[1]||(t[1]=e=>c.overlay=e),contained:"",class:"align-center justify-center"},{default:(0,a.w5)((()=>[n])),_:1},8,["modelValue"])])):(0,a.kq)("",!0),(0,a.Wm)(y)],64)}o(7658);var c=o(4161),h=o(9156),d=o(9028),u={components:{StaffBtn:h.Z},data(){return{loaded:!1,alert:!1,alert_text:"扫描失败请重试",key:"",overlay:!0}},methods:{verifyInWechat(){d.setStorageSync("user_key",this.key),this.overlay=!0;const e="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91a4ad470fb0b432&redirect_uri=https%3A%2F%2Fone.hkupootal.com%3Furl%3Dhttps%253A%252F%252Fsingcon23.hkupootal.com%252Fwechat&response_type=code&scope=snsapi_base#wechat_redirect";window.location.href=e},verifyRefused(){this.overlay=!0,c.Z.post("https://api.singcon23.hkupootal.com/user/refuse.php",{user_key:this.key},{headers:{"Content-Type":"multipart/form-data"}}).then((e=>{console.log(e.data),this.overlay=!1,"200"==e.data.code?this.$router.push({name:"vote",params:{user_key:this.key}}):"400"==e.data.code?(this.loaded=!1,this.alert_text="无效票，请尝试新扫描",this.alert=!0):"401"==e.data.code?(this.loaded=!1,this.alert_text="为入场，请先入场签到",this.alert=!0):(this.loaded=!1,this.alert_text="验证失败请重试",this.alert=!0,setTimeout((()=>{this.loaded=!0}),2e3))})).catch((e=>{console.log(e),this.overlay=!1,this.loaded=!1,this.alert_text="验证失败请重试",this.alert=!0,setTimeout((()=>{this.loaded=!0}),2e3)}))}},mounted(){console.log("mounted");const e=this.$router.currentRoute.value.query.k;console.log(e),this.key=e,c.Z.post("https://api.singcon23.hkupootal.com/user/check.php",{user_key:e},{headers:{"Content-Type":"multipart/form-data"}}).then((t=>{console.log(t.data),this.overlay=!1,"200"==t.data.code?(console.log("not binded or refused"),/MicroMessenger/i.test(window.navigator.userAgent)?(console.log("wechat"),this.verifyInWechat()):this.loaded=!0):"201"==t.data.code||"202"==t.data.code?this.$router.push({name:"vote",params:{user_key:e}}):"401"==t.data.code?(console.log("haven't checked in"),this.alert_text="未入场，请先入场签到。",this.alert=!0):(console.log("invalid try again"),this.alert_text="扫描失败请重试",this.alert=!0)})).catch((e=>{console.log(e),this.overlay=!1,this.alert_text="扫描失败请重试",this.alert=!0}))}},p=o(89);const y=(0,p.Z)(u,[["render",i]]);var m=y}}]);
//# sourceMappingURL=368.7df43c81.js.map